var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

// (function(){
//   $.ajax({
//     url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA_vnEI70cBJP62G80TP-xeoXThk46LcCI',
//
//
//   }).done(function(){
//     alert('success');
//   });
// });


// handleCurrentLocation: function(e){
//   e.preventDefault();
//   if (navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(this.showPosition);
//   }
// },
// showPosition: function(position){
//   var latitude = position.coords.latitude
//   var longitude = position.coords.longitude
//   this.showMap(latitude, longitude);
// },
// showMap: function(lat, lng){
//   var map = new google.maps.Map(document.getElementById('map'), {
//      center: {lat: lat, lng: lng},
//      zoom: 8
//    });
// },
//     map.addControl(new mapboxgl.Geocoder());


var GamesComponent = React.createClass({displayName: "GamesComponent",
  getInitialState: function(){
    return {
      center: []
    }
  },
  componentDidMount: function(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [-79.4512, 43.6568],
      zoom: 7
    });
    var currentUser = Parse.User.current();
    var PublicMatches = Parse.Object.extend("pumatch");
    var publicMatches = new Parse.Query(PublicMatches);
    publicMatches.equalTo("creator", currentUser)
    publicMatches.find({
      success: function(result){
        console.log('successful', result);
      },
      error: function(error){
        console.log(error);
      }
    })

  },
  handleCreateMatch: function(e){
    e.preventDefault();
    Backbone.history.navigate("createMatch", {trigger: true})
  },
  handleSetLocation: function(e){
    e.preventDefault();
  },
  render: function(){
    return (
        React.createElement("div", {className: "row games"}, 

          React.createElement("div", {className: "col m12 center-align"}, React.createElement("h4", null, "GAMES")), 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col m6"}, 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col m9 s12"}, React.createElement("input", {id: "zipcode", type: "number", placeholder: "Please enter your zipcode", className: "validate "})), 
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