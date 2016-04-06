var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

(function(){
  $.ajax({
    url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA_vnEI70cBJP62G80TP-xeoXThk46LcCI',


  }).done(function(){
    alert('success')
  });
})


var GamesComponent = React.createClass({displayName: "GamesComponent",
  handleCurrentLocation: function(e){
    e.preventDefault();
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  },
  showPosition: function(position){
    var latitude = position.coords.latitude
    var longitude = position.coords.longitude
    this.showMap(latitude, longitude);
  },
  showMap: function(lat, lng){
    var map = new google.maps.Map(document.getElementById('map'), {
       center: {lat: lat, lng: lng},
       zoom: 8
     });
  },
  render: function(){
    return (
        React.createElement("div", {className: "row games"}, 
          React.createElement("div", {className: "col-md-12 games-container"}, 
            React.createElement("h4", null, "GAMES"), 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col m9 s12"}, React.createElement("input", {id: "zipcode", type: "number", placeholder: "Please enter your zipcode", className: "validate "})), 
              React.createElement("div", {className: "col m3 s12"}, 
                React.createElement("button", {className: "btn btn-default z-depth-2 center-align"}, "Search Games")
              )
            ), 

            React.createElement("div", {className: "row center-align"}, 
              React.createElement("div", {className: "col m12"}, 
                React.createElement("button", {onClick: this.handleCurrentLocation, id: "current-location", type: "text", className: "validate btn btn-default z-depth-2"}, React.createElement("span", null, "Use your current location"), React.createElement("span", null), React.createElement("i", {className: "medium material-icons"}, "my_location")

                ), React.createElement("br", null)
              )
            ), 

            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col m12"}, 
                React.createElement("div", {id: "map"})
              )

            )
          )
        )

    );
  }
});

module.exports = GamesComponent;