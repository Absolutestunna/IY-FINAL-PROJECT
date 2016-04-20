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
  componentWillMount: function(){
    if (this.props.app.publicMatches.length <= 0){
      Backbone.history.navigate('games', {trigger: true});

    };
    if (!Parse.User.current()){
      Backbone.history.navigate('', {trigger: true});
    };
  },
  handleJoinPublicGame: function(model){
    console.log('model is: ', model);
    var relation = model[0].relation("publicGameCrew");
    relation.add(Parse.User.current());
    model[0].save();
  },
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
          game: result[0],
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
    })
  },

  render: function(){
    var app = this.props.app;
    return(
      <div className="row games-info">
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
          handleJoinPublicGame={this.handleJoinPublicGame}
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
        <div className="col m5 area-games">
          <ul className="collection with-header">
            <li className="header-collection collection-header">
              <i className="fa fa-futbol-o fa-2x" aria-hidden="true"></i>
              <h5>AVAILABLE GAMES</h5>
            </li>
            {games}
          </ul>
        </div>


    );
  }
});
var GamesDetailComponent = React.createClass({
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
      <div className="col m7 games-details">
        <h3>{this.props.time}</h3>
        <h1>{this.props.name}</h1>
        <div>
          <i className="icon medium material-icons">room</i>
          <span>{this.props.address}</span>
        </div>
        <p className="pdetails">{this.props.details}</p>
        <button className="btn waves-effect waves-light z-depth-2 light-green accent-3 join-game" onClick={this.handleGame}>JOIN GAME</button>
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
      <li className="row game-list collection-header">
        <div className="col m12">
          <h5 className="left-align">{model.get('name')}</h5>
          <a onClick={this.handleGameDetail} className="btn waves-effect waves-light red right">
            DETAILS
          </a>
        </div>



      </li>
    );
  }
});



module.exports = GameDetailController;
