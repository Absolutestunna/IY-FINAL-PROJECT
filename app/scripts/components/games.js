var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');


var DistanceGamesComponent = require('./distanceGames.jsx');

var GamesComponent = React.createClass({displayName: "GamesComponent",
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
        React.createElement("div", {className: "row games"}, 

          React.createElement("div", {className: "col xs12 col s12 col m12 col l12"}, 
            React.createElement("div", {className: "row game-nav"}, 
              React.createElement("div", {className: "col m3 col l3 hide-on-small-and-down"}, 
                React.createElement("img", {id: "games-logo", src: "././images/Kikkitlogo.png"})
              ), 
              React.createElement("div", {className: "col m8 col s11 col xs11 col l8 center-align game-name"}, 
                React.createElement("h4", null, "GAMES")
              ), 
              React.createElement("div", {className: "col xs1 col m1 col l1 col s1 right-align hide-on-small-and-up"}, 
                  React.createElement("a", {onClick: this.handleCurrentLocation, className: "light-green accent-3 btn-floating btn-large waves-effect waves-light"}, React.createElement("i", {className: "tiny material-icons"}, "room"))
              ), 
              React.createElement("div", {className: "sign-out-icon col s1 col xs1 col l1 col m1 hide-on-small-and-down right-align"}, 
                React.createElement("i", {onClick: this.handleLogout, className: "fa fa-sign-out fa-3x", "aria-hidden": "true"})
              )
            )
          ), 

          React.createElement("div", {className: "row editSlider"}, 
            React.createElement("div", {className: "col m9 hide-on-small-and-down"}, 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "input-field col m9 hide-on-small-and-down"}, 
                  React.createElement("input", {id: "address", type: "text", className: "validate "}), 
                  React.createElement("label", {htmlFor: "address"}, "Search for address")
                ), 
                React.createElement("div", {className: "col m3 hide-on-small-and-down search-button"}, 
                  React.createElement("button", {onClick: this.handleSetLocation, className: "btn btn-default center-align light-green accent-3"}, "Search Games")
                )
              )
            ), 

            React.createElement("span", {className: "col xs11 col s11 right-align white-text hide-on-small-and-down"}, "Use your location"), 
            React.createElement("div", {className: "col m3 col l1 col xs1 col s1 hide-on-small-and-down right-align", id: "current-location"}, 
                React.createElement("a", {onClick: this.handleCurrentLocation, className: "light-green accent-3 btn-floating btn-large waves-effect waves-light"}, React.createElement("i", {className: "tiny material-icons"}, "room"))
            )
          ), 

          React.createElement("div", {className: "map"}, 
            React.createElement("div", {id: "map"}), 
            React.createElement("div", {className: "gameDetails"})
          ), 

          React.createElement("button", {onClick: this.handleCreateMatch, className: "create-match waves-effect waves-light btn center-align light-green accent-3"}, "Create Match")

        )

    );
  }
});

module.exports = GamesComponent;