var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var GameDetailController = React.createClass({
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
      <div className="row">
        <DistanceGamesListComponent
          app={app}
          handleDetailGame={this.handleDetailGame}/>
        <GamesDetailComponent
          gameSelected={this.state.model}
          handleJoinPublicGame={this.handleJoinPublicGame}
        />

      </div>
    );
  }
});

var DistanceGamesListComponent = React.createClass({
  render: function(){
    var app = this.props.app;
    var self = this;
      var games = app.publicMatches.map(function(game){
        return (<Game
          handleDetailGame={self.props.handleDetailGame}
          model={game}
          key={game.id}
          />
        );
      });
    return (
        <div className="col m5">
          <ul className="collection with-header">
            <li className="collection-header"><h4>Games around your area</h4></li>
            {games}
          </ul>
        </div>


    );
  }
});

var GamesDetailComponent = React.createClass({
  getInitialState: function(){
    return {
      lat: null,
      log: null
    }
  },
  handleAddressConversion: function(select){
    var selectID = select[0].id
    var puMatchQuery = new Parse.Query("pumatch");
    var self = this;
    puMatchQuery.get(selectID, {
      success: function(result){
        self.setState({
          lat: result.get('geoPoint')._latitude,
          log: result.get('geoPoint')._longitude
        });
        console.log(self.state.lat, self.state.log);

        L.mapbox.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
        var map = L.mapbox.map('map1', 'mapbox.streets')
          .setView([self.state.log, self.state.lat], 16);

        L.marker([self.state.log, self.state.lat], {
           icon: L.mapbox.marker.icon({
             'marker-color': '#f86767'
           }),
        }).addTo(map);


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
      <div className="col m7">
        <h5>{name}</h5>
        <h5>{time}</h5>
        <p>{details}</p>
        <p>{address}</p>

        <button onClick={this.props.handleJoinPublicGame.bind(this, gameSelected)} className="btn waves-effect waves-light red">Join Game</button>
        <div id="map1"></div>
      </div>
    );
  }
});

var Game = React.createClass({
  render: function(){
    var model = this.props.model
    return(
      <li className="row collection-header">
        <div className="col m10">
          <h2>{model.get('name')}</h2>
        </div>
        <div className="col m1 left-align">
          <button onClick={this.props.handleDetailGame.bind(this, model)}
            className="btn waves-effect waves-light red"><i className="material-icons center">send</i></button>
        </div>
      </li>
    );
  }
});

module.exports = GameDetailController;
