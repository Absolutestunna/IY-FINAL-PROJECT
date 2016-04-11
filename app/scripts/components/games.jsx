var React = require('react');
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




var GamesComponent = React.createClass({
  getInitialState: function(){
    return {
      center: []
    }
  },
  componentDidMount: function(){
    L.mapbox.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    var map = L.mapbox.map('map', 'mapbox.streets')
    this.map = map;
    this.map.fitWorld()

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
            console.log('locations final are: ', locations);

            locations.map(function(locate){
              var latitude = locate._latitude;
              var longitude = locate._longitude
              console.log(longitude, latitude);
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
    console.log('location is: ', location);

    location = [location[1], location[0]];
    L.mapbox.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    this.map.setView(location, 4)
    L.marker(location, {
       icon: L.mapbox.marker.icon({
         'marker-color': '#ccc'
       }),
   }).addTo(this.map);

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
      console.log('data is: ', data); {/*geojson data to be passed to render the map*/}
      self.renderMap(data);
    });


  },
  handleCurrentLocation: function(e){
    e.preventDefault();
    L.mapbox.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    this.map.locate({setView: true, maxZoom: 6});

  },
  render: function(){
    return (
        <div className="row games">

          <div className="col m12 center-align"><h4>GAMES</h4></div>
          <div className="row">
            <div className="col m6">
              <div className="row">
                <div className="col m9 s12"><input id="address" type="text" placeholder="Please enter your address" className="validate " /></div>
                <div className="col m3 s12">
                  <button onClick={this.handleSetLocation} className="btn btn-default z-depth-2 center-align">Search Games</button>
                </div>
              </div>
            </div>

            <div className="col m6">
              <div className="row">
                <div className="col m12 right-align">
                  <button onClick={this.handleCurrentLocation}  id="current-location" type="text" className="validate btn btn-default z-depth-2"><span>Use your current location</span><span></span><i className="medium material-icons">my_location</i></button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col m12">
              <button onClick={this.handleCreateMatch} className="waves-effect waves-light btn center-align">Create Match</button>

            </div>
          </div>
          <div className="row">
            <div id="map" className="col m12">
            </div>
          </div>
        </div>

    );
  }
});

module.exports = GamesComponent;
