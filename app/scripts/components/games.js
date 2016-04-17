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
  handleCurrentLocation: function(e){
    e.preventDefault();
    var geolocation = navigator.geolocation;

    // L.mapbox.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    // this.map.locate({setView: true, maxZoom: 8});
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
      console.log('queryLocation', queryLocation);
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
  render: function(){

    return (
        React.createElement("div", {className: "row games"}, 

          React.createElement("div", {className: "col m12 center-align"}, React.createElement("h4", null, "GAMES")), 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col m9"}, 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "input-field col m9 s12"}, 
                  React.createElement("input", {id: "address", type: "text", className: "validate "}), 
                  React.createElement("label", {htmlFor: "address"}, "Search for address")

                ), 
                React.createElement("div", {className: "col m3 s12"}, 
                  React.createElement("button", {onClick: this.handleSetLocation, className: "btn btn-default z-depth-2 center-align"}, "Search Games")
                )
              )
            ), 

            React.createElement("div", {className: "col m3"}, 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col m12 right-align"}, 
                  React.createElement("button", {onClick: this.handleCurrentLocation, id: "current-location", className: "btn-floating btn-large waves-effect waves-light red z-depth-2"}, React.createElement("i", {className: "medium material-icons"}, "my_location"))
              )
              )
            )
          ), 

          React.createElement("div", {className: "map"}, 
            React.createElement("div", {id: "map"}), 
            React.createElement("div", {className: "gameDetails"})
          ), 



          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col m12 center-align create-match"}, 
              React.createElement("button", {onClick: this.handleCreateMatch, className: "waves-effect waves-light btn center-align"}, "Create Match")

            )
          )
        )

    );
  }
});

module.exports = GamesComponent;