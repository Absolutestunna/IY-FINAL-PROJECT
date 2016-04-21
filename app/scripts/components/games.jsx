var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');


var DistanceGamesComponent = require('./distanceGames.jsx');

var GamesComponent = React.createClass({
  getInitialState: function(){
    return {
      location: null
    }
  },
  componentDidMount: function(){
    if (!Parse.User.current()){
      Backbone.history.navigate('', {trigger: true});
    }
    L.mapbox.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    var map = L.mapbox.map('map', 'mapbox.streets')
    this.map = map;
    this.map.setView([34.8512217,-82.4048317], 4);

    {/*Query to get the public matches stored in parse
      */}
    var puMatchQuery = new Parse.Query("pumatch");
    var self = this;
    var locations;
      puMatchQuery.find({
        success: function(results) {
          locations = results.map(function(location){
              return location.get('geoPoint');
          });
          locations.map(function(locate){
            var latitude = locate._latitude;
            var longitude = locate._longitude
            L.mapbox.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
            L.marker([longitude, latitude], {
               icon: L.mapbox.marker.icon({
                 'marker-color': '#f86767'
               }),
            }).addTo(self.map);

          })
        },
        error: function(error) {
          console.log(error);
          // error is an instance of Parse.Error.
        }
      });

  },

  handleCreateMatch: function(e){
    e.preventDefault();
    Backbone.history.navigate("createMatch", {trigger: true})
  },

  renderMap: function(place){  {/*function used to rerender the map based on address typed*/}
    var location = place.features[0].center; {/*specifically get the geolocation of the address*/}
    this.originalLocation = location;
    var newLocation = [location[1], location[0]];
    this.location = newLocation;
    L.mapbox.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    this.map.setView(newLocation, 8)
    L.marker(location, {
       icon: L.mapbox.marker.icon({
         'marker-color': '#ccc'
       }),
   }).addTo(this.map);


  },
  handleDistanceMatchQuery: function(place){
    var self = this;

    var queryLocation = place.features[0].center;
    var distanceMatchQuery = new Parse.Query("pumatch");
    var queryLocationNew = new Parse.GeoPoint(queryLocation);
    distanceMatchQuery.withinMiles("geoPoint", queryLocationNew, 15).find({
      success: function(results) {
            var app = self.props.app;
            app.publicMatches = results;
            app.navigate('gamesDistance', {trigger: true});
      },
      error: function(error) {
        console.log(error);
        // error is an instance of Parse.Error.
      }
    });
  },

  handleSetLocation: function(e){
    e.preventDefault();
    var urlBase = 'https://api.mapbox.com/'
    var body = 'geocoding/v5/mapbox.places/';
    var q = $('#address').val();
    var accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    var url = urlBase+body+q+'.json?access_token='+accessToken;
    var self = this;
    $.get(url, function(data) {  //geojson data to be passed to render the map
      self.renderMap(data);
      self.handleDistanceMatchQuery(data);
    });

  },
  handleLogout: function(e){
    console.log('logout');
    e.preventDefault();
    Parse.User.logOut();
    Backbone.history.navigate('', {trigger: true})
  },
    handleCurrentLocation: function(e){
    e.preventDefault();
    var geolocation = navigator.geolocation;
    var self = this;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
      var lat = position.coords.latitude;
      var log = position.coords.longitude;

      var queryLocation = [log, lat];
      var distanceMatchQuery = new Parse.Query("pumatch");
      var queryLocationNew = new Parse.GeoPoint(queryLocation);
      distanceMatchQuery.withinMiles("geoPoint", queryLocationNew, 15).find({
        success: function(results) {
              var app = self.props.app;
              console.log('results', results);
              app.publicMatches = results;
              app.navigate('gamesDistance', {trigger: true});
        },
        error: function(error) {
          console.log(error);
          // error is an instance of Parse.Error.
        }
      });

    }

  },
  handleSearchSlider: function(e){
    e.preventDefault();
    $(".editSlider").slideToggle(700);
  },
  render: function(){

    return (
        <div className="row games">

          <div className="col xs12 col s12 col m12 col l12">
            <div className="row game-nav">
              <div className="col m3 col l3 hide-on-small-and-down">
                <img id="games-logo" src="././images/Kikkitlogo.png"/>
              </div>
              <div className="col m8 col s11 col xs11 col l8 center-align game-name">
                <h4>GAMES</h4>
              </div>
              <div className="col xs1 col m1 col l1 col s1 right-align hide-on-small-and-up">
                  <a onClick={this.handleCurrentLocation} className="light-green accent-3 btn-floating btn-large waves-effect waves-light"><i className="tiny material-icons">room</i></a>
              </div>
              <div className="sign-out-icon col s1 col xs1 col l1 col m1 hide-on-small-and-down right-align">
                <i onClick={this.handleLogout} className="fa fa-sign-out fa-3x" aria-hidden="true"></i>
              </div>
            </div>
          </div>

          <div className="row editSlider">
            <div className="col m9 hide-on-small-and-down">
              <div className="row">
                <div className="input-field col m9 hide-on-small-and-down">
                  <input id="address" type="text" className="validate " />
                  <label htmlFor="address">Search for address</label>
                </div>
                <div className="col m3 hide-on-small-and-down search-button">
                  <button onClick={this.handleSetLocation} className="btn btn-default center-align light-green accent-3">Search Games</button>
                </div>
              </div>
            </div>

            <span className="col xs11 col s11 right-align white-text hide-on-small-and-down">Use your location</span>
            <div className="col m3 col l1 col xs1 col s1 hide-on-small-and-down right-align" id="current-location">
                <a onClick={this.handleCurrentLocation} className="light-green accent-3 btn-floating btn-large waves-effect waves-light"><i className="tiny material-icons">room</i></a>
            </div>
          </div>

          <div className="map">
            <div id="map"></div>
            <div className="gameDetails"></div>
          </div>

          <button onClick={this.handleCreateMatch} className="create-match waves-effect waves-light btn center-align light-green accent-3">Create Match</button>

        </div>

    );
  }
});

module.exports = GamesComponent;
