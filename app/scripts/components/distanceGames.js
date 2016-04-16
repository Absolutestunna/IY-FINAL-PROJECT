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
      geoPoint: []
    }
  },
  // handleJoinPublicGame: function(model){
  //   var relation = model[0].relation("publicGameCrew");
  //   relation.add(Parse.User.current());
  //   model[0].save();
  // },
  handleDetailGame: function(model){
    var DetailQuery = Parse.Object.extend("pumatch")
    var detailQuery = new Parse.Query(DetailQuery);
    detailQuery.equalTo('objectId', model.id);
    var id = model.id;
    var self = this;
    detailQuery.find({
      success: function(result){
        console.log('your result is: ', result);
        self.setState({
          name: result[0].get('name'),
          time: result[0].get('time'),
          details: result[0].get('details'),
          address: result[0].get('address'),
          geoPoint: result[0].get('geoPoint'),
          lat: result[0].get('geoPoint')._latitude,
          log: result[0].get('geoPoint')._longitude
        })
      },
      error: function(error){
        console.log(error);
      }
    })
  },

  render: function(){
    var app = this.props.app;
    return(
      React.createElement("div", {className: "row"}, 
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
          geoPoint: this.state.geoPoint}

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
        // console.log('game is: ', typeof(game.get("geoPoint")));
        // game = game.get("details") : '' ? game.get("address") : '' ? game.get("name") : '' ? game.get("geoPoint") : "" ? game.get("time") : "";

        // var imageUrl = product.get("images").length > 0 ? product.get("images")[0].url() : '';


        return (React.createElement(Game, {
          model: game, 
          key: game.id, 
          handleDetailGame: self.props.handleDetailGame}

          )
        );
      });

    return (
        React.createElement("div", {className: "col m5"}, 
          React.createElement("ul", {className: "collection with-header"}, 
            React.createElement("li", {className: "collection-header"}, React.createElement("h4", null, "Games around your area")), 
            games
          )
        )


    );
  }
});
var GamesDetailComponent = React.createClass({displayName: "GamesDetailComponent",
  componentDidMount: function(){
    L.mapbox.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    var map = L.mapbox.map('map1', 'mapbox.streets')
    this.map = map;
    this.map.setView([34.8512217,-82.4048317], 4);
  },
  render: function(){
    var geoPoint = this.props.geoPoint
    console.log('log is: ', geoPoint);
    if (!geoPoint){
      this.map.setView([this.props.log, this.props.lat], 4);
      L.marker([this.props.log, this.props.lat], {
         icon: L.mapbox.marker.icon({
           'marker-color': '#f86767'
         }),
      }).addTo(this.map);

    }
    return (
      React.createElement("div", {className: "col m7"}, 
        React.createElement("div", null, this.props.name), 
        React.createElement("div", null, this.props.time), 
        React.createElement("div", null, this.props.address), 
        React.createElement("div", null, this.props.details), 

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
      React.createElement("li", {className: "row collection-header"}, 
        React.createElement("div", {className: "col m10"}, 
          React.createElement("h2", null, model.get('name'))
        ), 
        React.createElement("div", {className: "col m1 left-align"}, 
          React.createElement("button", {onClick: this.handleGameDetail, 
            className: "btn waves-effect waves-light red"}, React.createElement("i", {className: "material-icons center"}, "send"))
        )
      )
    );
  }
});



module.exports = GameDetailController;