var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var GameDetailController = React.createClass({displayName: "GameDetailController",
  getInitialState: function(){
    return {
      publicGameCrew: [],
      lat: 0,
      log: 0,
      name: "",
      time: "",
      details: "",
      address: "",
      geoPoint: [],
      crew: []
    }
  },
  componentWillMount: function(){
    if (this.props.app.publicMatches.length <= 0){
      Backbone.history.navigate('games', {trigger: true});
    };
    if (!Parse.User.current()){
      Backbone.history.navigate('', {trigger: true});
    };


  },
  handleJoinPublicGame: function(model){
    var relation = model.relation("publicGameCrew");
    relation.add(Parse.User.current());
    model.save();
  },
  handleDetailGame: function(model){
    var DetailQuery = Parse.Object.extend("pumatch");
    var detailQuery = new Parse.Query(DetailQuery);
    detailQuery.include('publicGameCrew');
    detailQuery.equalTo('objectId', model.id);

    var self = this;
    detailQuery.find({
      success: function(result){
        self.setState({
          name: result[0].get('name'),
          time: result[0].get('time'),
          details: result[0].get('details'),
          address: result[0].get('address'),
          geoPoint: result[0].get('geoPoint'),
          lat: result[0].get('geoPoint')._latitude,
          log: result[0].get('geoPoint')._longitude
        });
      },
      error: function(error){
        console.log(error);
      }
    });

    // var puMatchQuery = new Parse.Query("pumatch");
    // var relation = puMatchQuery.relation('publicGameCrew');
    // console.log(relation);
    // var query = relation.query();
    // console.log(query);
    // query.find({
    //   success: function(result){
    //     console.log('relation query', result);
    //   },
    //   error: function(error){
    //     console.log('error', error);
    //   }
    // });


  },

  handleLogout: function(e){
    e.preventDefault();
    Parse.User.logOut();
    Backbone.history.navigate('', {trigger: true})

  },
  render: function(){
    var app = this.props.app;
    return(
      React.createElement("div", {className: "row games-info"}, 
        React.createElement("div", {className: "distance-logout col m12 right-align"}, 
          React.createElement("i", {onClick: this.handleLogout, className: "fa fa-sign-out fa-3x", "aria-hidden": "true"})
        ), 
        React.createElement(DistanceGamesListComponent, {
          app: app, 
          handleDetailGame: this.handleDetailGame}
        ), 
        React.createElement(GamesDetailComponent, {
          game: this.state.game, 
          name: this.state.name, 
          time: this.state.time, 
          details: this.state.details, 
          address: this.state.address, 
          lat: this.state.lat, 
          log: this.state.log, 
          geoPoint: this.state.geoPoint, 
          handleJoinPublicGame: this.handleJoinPublicGame}
        )
      )
    );
  }
});

var DistanceGamesListComponent = React.createClass({displayName: "DistanceGamesListComponent",
  render: function(){
    var app = this.props.app;
    var publicMatches = app.publicMatches;
    var self = this;
      var games = publicMatches.map(function(game){


        return (React.createElement(Game, {
          model: game, 
          key: game.id, 
          handleDetailGame: self.props.handleDetailGame}

          )
        );
      });

    return (
        React.createElement("div", {className: "col m5 area-games"}, 
          React.createElement("ul", {className: "collection with-header"}, 
            React.createElement("li", {className: "header-collection collection-header"}, 
              React.createElement("i", {className: "fa fa-futbol-o fa-2x", "aria-hidden": "true"}), 
              React.createElement("h5", null, "AVAILABLE GAMES")
            ), 
            games
          )
        )


    );
  }
});
var GamesDetailComponent = React.createClass({displayName: "GamesDetailComponent",
  componentDidMount: function(){
    $('.icon').hide();
    $('.join-game').hide();
    L.mapbox.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    var map = L.mapbox.map('map1', 'mapbox.streets')
    this.map = map;

    var geoPoint = this.props.geoPoint
    this.map.setView([39.0119, -98.4842], 7);

  },
  componentWillReceiveProps: function(nextProps){
    var lat = nextProps.geoPoint._latitude;
    var log = nextProps.geoPoint._longitude;
    this.map.setView([log, lat], 15);
    L.marker([log, lat], {
       icon: L.mapbox.marker.icon({
         'marker-color': '#f86767'
       }),
    }).addTo(this.map);
    $('.icon').show();
    $('.join-game').show();


  },
  handleGame: function(e){
    e.preventDefault();
    this.props.handleJoinPublicGame(this.props.game);
  },
  render: function(){
    return (
      React.createElement("div", {className: "col m7 games-details"}, 
        React.createElement("h3", null, this.props.time), 
        React.createElement("h1", null, this.props.name), 
        React.createElement("div", null, 
          React.createElement("i", {className: "icon medium material-icons"}, "room"), 
          React.createElement("span", null, this.props.address)
        ), 
        React.createElement("p", {className: "pdetails"}, this.props.details), 
        React.createElement("button", {className: "btn waves-effect waves-light light-green accent-3 join-game", onClick: this.handleGame}, "JOIN GAME"), 
        React.createElement("div", {id: "map1"})
      )
    )
  }
});


var Game = React.createClass({displayName: "Game",
  handleGameDetail: function(){
    this.props.handleDetailGame(this.props.model);

  },
  render: function(){
    var model = this.props.model
    return(
      React.createElement("li", {className: "row game-list collection-header"}, 
        React.createElement("div", {className: "col m12"}, 
          React.createElement("h5", {className: "left-align"}, model.get('name')), 
          React.createElement("a", {onClick: this.handleGameDetail, className: "btn waves-effect waves-light red right"}, 
            "DETAILS"
          )
        )

      )
    );
  }
});



module.exports = GameDetailController;