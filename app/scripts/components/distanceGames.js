var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var GameDetailController = React.createClass({displayName: "GameDetailController",
  getInitialState: function(){
    return {
      model: [],
      publicGameCrew: []
    }
  },
  handleJoinPublicGame: function(model){

    // var gameID = model[0].id;
    // console.log('gameID is: ', gameID);
    // var JoinPublicCrew = Parse.Object.extend("pumatch");
    // var acceptQuery = new Parse.Query(JoinPublicCrew);
    // acceptQuery.get(gameID, {
    //   success: function(result){
    //     console.log('result is: ', result);
    //
    //     var organizer = result.get("creator");
    //     var user = Parse.User.current();
    //     var relation = user.relation("publicGameCrew");
    //     relation.add(organizer);
    //     user.save();
    //     // result.destroy({});
    //   },
    //   error: function(error){
    //     console.log(error);
    //   }
    // })


  },
  handleDetailGame: function(model){
    var DetailQuery = Parse.Object.extend("pumatch")
    var detailQuery = new Parse.Query(DetailQuery);
    detailQuery.equalTo('objectId', model.id);
    var id = model.id;
    var self = this;
    detailQuery.find({
      success: function(result){
        console.log('result is: ', result);
        self.setState({model: result})

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
          handleDetailGame: this.handleDetailGame}), 
        React.createElement(GamesDetailComponent, {
          gameSelected: this.state.model, 
          handleJoinPublicGame: this.handleJoinPublicGame}
        )

      )
    );
  }
});

var DistanceGamesListComponent = React.createClass({displayName: "DistanceGamesListComponent",
  render: function(){
    var app = this.props.app;
    var self = this;
      var games = app.publicMatches.map(function(game){
        return (React.createElement(Game, {
          handleDetailGame: self.props.handleDetailGame, 
          model: game, 
          key: game.id}
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
  handleAddressConversion: function(select){
    var selectID = select[0].id
    var puMatchQuery = new Parse.Query("pumatch");
    var self = this;
    puMatchQuery.get(selectID, {
      success: function(result){
        var lat = result.get('geoPoint')._latitude;
        var log = result.get('geoPoint')._longitude;
        console.log(log, lat);
        L.mapbox.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
        var map = L.mapbox.map('map1', 'mapbox.streets')
          
          L.marker([log, lat], {
           icon: L.mapbox.marker.icon({
             'marker-color': '#f86767'
           }),
        }).addTo(this.map);
      },
      error: function(error){
        console.log(error);
      }
    })
    // var self = this;
    // console.log(this.props.);

    // var location;
    //
    //   puMatchQuery.find({
    //     success: function(results) {
    //       locations = results.map(function(location){
    //           return location.get('geoPoint');
    //       });
    //       locations.map(function(locate){
    //         var latitude = locate._latitude;
    //         var longitude = locate._longitude
    //         L.mapbox.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    //         L.marker([longitude, latitude], {
    //            icon: L.mapbox.marker.icon({
    //              'marker-color': '#f86767'
    //            }),
    //         }).addTo(self.map);
    //
    //       })
  },
  render: function(){
    var name = "";
    var time= "";
    var details;
    var address;
    var gameSelected = this.props.gameSelected;
    if (gameSelected.length > 0){
      name = gameSelected[0].get('name');
      time = gameSelected[0].get('time');
      details = gameSelected[0].get('details');
      address = gameSelected[0].get('address');
      this.handleAddressConversion(gameSelected);

    }

    return(
      React.createElement("div", {className: "col m7"}, 
        React.createElement("h5", null, name), 
        React.createElement("h5", null, time), 
        React.createElement("p", null, details), 
        React.createElement("p", null, address), 

        React.createElement("button", {onClick: this.props.handleJoinPublicGame.bind(this, gameSelected), className: "btn waves-effect waves-light red"}, "Join Game"), 
        React.createElement("div", {id: "map1"})
      )
    );
  }
});

var Game = React.createClass({displayName: "Game",
  render: function(){
    var model = this.props.model
    return(
      React.createElement("li", {className: "row collection-header"}, 
        React.createElement("div", {className: "col m10"}, 
          React.createElement("h2", null, model.get('name'))
        ), 
        React.createElement("div", {className: "col m1 left-align"}, 
          React.createElement("button", {onClick: this.props.handleDetailGame.bind(this, model), 
            className: "btn waves-effect waves-light red"}, React.createElement("i", {className: "material-icons center"}, "send"))
        )
      )
    );
  }
});

module.exports = GameDetailController;