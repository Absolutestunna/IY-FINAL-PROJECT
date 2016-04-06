var React = require('react');
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


var GamesComponent = React.createClass({
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
        <div className="row games">
          <div className="col-md-12 games-container">
            <h4>GAMES</h4>
            <div className="row">
              <div className="col m9 s12"><input id="zipcode" type="number" placeholder="Please enter your zipcode" className="validate " /></div>
              <div className="col m3 s12">
                <button className="btn btn-default z-depth-2 center-align">Search Games</button>
              </div>
            </div>

            <div className="row center-align">
              <div className="col m12">
                <button onClick={this.handleCurrentLocation}  id="current-location" type="text" className="validate btn btn-default z-depth-2"><span>Use your current location</span><span></span><i className="medium material-icons">my_location</i>

                </button><br/>
              </div>
            </div>

            <div className="row">
              <div className="col m12">
                <div id="map"></div>
              </div>

            </div>
          </div>
        </div>

    );
  }
});

module.exports = GamesComponent;
