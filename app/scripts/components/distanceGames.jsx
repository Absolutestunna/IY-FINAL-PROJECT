var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var GameDetailController = React.createClass({
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
      <div className="row">
        <DistanceGamesListComponent
          app={app}
          handleDetailGame={this.handleDetailGame}
        />
        <GamesDetailComponent
          game={this.state.game}
          name={this.state.name}
          time={this.state.time}
          details={this.state.details}
          address={this.state.address}
          lat={this.state.lat}
          log={this.state.log}
          geoPoint={this.state.geoPoint}

        />
      </div>
    );
  }
});

var DistanceGamesListComponent = React.createClass({
  render: function(){
    var app = this.props.app;
    var publicMatches = app.publicMatches;
    var self = this;
      var games = publicMatches.map(function(game){


        return (<Game
          model={game}
          key={game.id}
          handleDetailGame={self.props.handleDetailGame}

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
  componentDidMount: function(){
    L.mapbox.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    var map = L.mapbox.map('map1', 'mapbox.streets')
    this.map = map;

    var geoPoint = this.props.geoPoint
    this.map.setView([98.4842, 39.0119], 2);

  },
  componentWillReceiveProps: function(nextProps){
    var lat = nextProps.geoPoint._latitude;
    var log = nextProps.geoPoint._longitude;
    this.map.setView([log, lat], 4);
    L.marker([log, lat], {
       icon: L.mapbox.marker.icon({
         'marker-color': '#f86767'
       }),
    }).addTo(this.map);
  },
  render: function(){
    return (
      <div className="col m7">
        <div>{this.props.name}</div>
        <div>{this.props.time}</div>
        <div>{this.props.address}</div>
        <div>{this.props.details}</div>

        <div id="map1"></div>
      </div>
    )
  }
});


var Game = React.createClass({
  handleGameDetail: function(){
    this.props.handleDetailGame(this.props.model);

  },
  render: function(){
    var model = this.props.model
    return(
      <li className="row collection-header">
        <div className="col m10">
          <h2>{model.get('name')}</h2>
        </div>
        <div className="col m1 left-align">
          <button onClick={this.handleGameDetail}
            className="btn waves-effect waves-light red"><i className="material-icons center">send</i></button>
        </div>
      </li>
    );
  }
});



module.exports = GameDetailController;
