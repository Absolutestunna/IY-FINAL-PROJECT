var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

// L.mapbox.featureLayer({
//     // this feature is in the GeoJSON format: see geojson.org
//     // for the full specification
//     type: 'Feature',
//     geometry: {
//         type: 'Point',
//         // coordinates here are in longitude, latitude order because
//         // x, y is the standard for GeoJSON and many formats
//         coordinates: [
//           -77.03221142292,
//           38.913371603574
//         ]
//     },
//     properties: {
//         title: 'Peregrine Espresso',
//         description: '1718 14th St NW, Washington, DC',
//         // one can customize markers by adding simplestyle properties
//         // https://www.mapbox.com/guides/an-open-platform/#simplestyle
//         'marker-size': 'large',
//         'marker-color': '#BE9A6B',
//         'marker-symbol': 'cafe'
//     }
// }).addTo(map);


//
// renderMap: function(place){
//   console.log(place);
//   var location = place.features[0].center;
//   mapboxgl.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
//   var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v8',
//     center: location,
//     zoom: 10
//   });
//
//
//
// },




var GamesComponent = React.createClass({displayName: "GamesComponent",
  getInitialState: function(){
    return {
      center: []
    }
  },
  componentDidMount: function(){
    L.mapbox.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    var map = L.mapbox.map('map', 'mapbox.streets')


    {/*Query to get the public matches stored in parse
      */}
      var puMatchQuery = new Parse.Query("pumatch");
      var self = this;
        puMatchQuery.find({
          success: function(results) {
            var locations = results.map(function(location){
              return location.get('location');
            });
            console.log('locations are: ',locations);
            self.handleConvertAddress(locations)
          },
          error: function(error) {
            console.log(error);
            // error is an instance of Parse.Error.
          }
        });
  },
  handleConvertAddress: function(locations){
    var conversions = [];
    locations.map(function(location){
      var urlBase = 'https://api.mapbox.com/'
      var body = 'geocoding/v5/mapbox.places/';
      var q = location;
      var accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
      var url = urlBase+body+q+'.json?access_token='+accessToken;
      var self = this;
      $.get(url, function( data ) {
        conversions.push(data.features[0].center);
      });
    });


  },
  handleCreateMatch: function(e){
    e.preventDefault();
    Backbone.history.navigate("createMatch", {trigger: true})
  },
  renderMap: function(place){
    console.log('place is: ',place);

    var location = place.features[0].center;

    L.mapbox.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    L.mapbox.map('map').remove();

  },
  handleSetLocation: function(e){
    e.preventDefault();
    var urlBase = 'https://api.mapbox.com/'
    var body = 'geocoding/v5/mapbox.places/';
    var q = $('#address').val();
    var accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    var url = urlBase+body+q+'.json?access_token='+accessToken;
    var self = this;
    $.get(url, function( data ) {
      console.log('data is: ', data);
      self.renderMap(data);
    });


  },
  handleCurrentLocation: function(e){
    e.preventDefault();
    L.mapbox.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    var map = L.mapbox.map()
      .locate()
  },
  render: function(){
    return (
        React.createElement("div", {className: "row games"}, 

          React.createElement("div", {className: "col m12 center-align"}, React.createElement("h4", null, "GAMES")), 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col m6"}, 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col m9 s12"}, React.createElement("input", {id: "address", type: "text", placeholder: "Please enter your address", className: "validate "})), 
                React.createElement("div", {className: "col m3 s12"}, 
                  React.createElement("button", {onClick: this.handleSetLocation, className: "btn btn-default z-depth-2 center-align"}, "Search Games")
                )
              )
            ), 

            React.createElement("div", {className: "col m6"}, 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col m12 right-align"}, 
                  React.createElement("button", {onClick: this.handleCurrentLocation, id: "current-location", type: "text", className: "validate btn btn-default z-depth-2"}, React.createElement("span", null, "Use your current location"), React.createElement("span", null), React.createElement("i", {className: "medium material-icons"}, "my_location"))
                )
              )
            )
          ), 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col m12"}, 
              React.createElement("button", {onClick: this.handleCreateMatch, className: "waves-effect waves-light btn center-align"}, "Create Match")

            )
          ), 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {id: "map", className: "col m12"}
            )
          )
        )

    );
  }
});

module.exports = GamesComponent;