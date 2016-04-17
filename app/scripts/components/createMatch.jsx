var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var moment = require('moment');
require('backbone-react-component');



var CreateMatchComponent = React.createClass({
  getInitialState: function(){
    return {
      geoLocation: null
    }
  },

  handleCreatePublicMatch: function(e){
    e.preventDefault();
    var currentUser = Parse.User.current();
    var PuMatch = Parse.Object.extend("pumatch");
    var geoPoint;
    var urlBase = 'https://api.mapbox.com/'
    var body = 'geocoding/v5/mapbox.places/';
    var q = $('#location').val();
    var accessToken = 'pk.eyJ1IjoiYWJzb2x1dGVzdHVubmEiLCJhIjoiY2ltdGhrd3k4MDIzMHZobTRpcmcyMnhreSJ9.BhWC0ZLzfdyDmWQ7dGRi4Q';
    var url = urlBase+body+q+'.json?access_token='+accessToken;
    var self = this;
    $.get(url, function( data ) {

      {/*geojson data to be passed to render the map*/}
      self.setState({
        geoLocation: data.features[0].center
      });

    });
    console.log('stateLocation is: ', this.state.geoLocation);
    var puMatch = new PuMatch();
    puMatch.set({
      name: $("#park_name").val(),
      time: $("#time").val(),
      address: $('#location').val(),
      details: $('#details').val(),
      creator: currentUser,
    });
    puMatch.save(null, {
      success: function(info) {
            console.log('New object created with objectId: ' + info.id);
            self.addLocation(info.id)
        },
      error: function(info, error) {
        console.log('Failed to create new object, with error code: ' + error.message);
        }
    });


  },
addLocation: function(id){
  var matchQuery = new Parse.Query("pumatch");
  var self = this;
    matchQuery.get(id, {
      success: function(result) {
        var point = new Parse.GeoPoint(self.state.geoLocation);

        console.log('point is: ', point);
        result.set("geoPoint", point);
        result.save();
      },
      error: function(error) {
        console.log('objectId error is: ', error);
      }
    }).then(function(){
      Backbone.history.navigate('games', {trigger: true})

    });
},
handleInviteCrew: function(e){
  e.preventDefault();
},
  render: function(){
    return (
      <div className="row match-container">
        <h4 className="col m12 center-align createMatch">CREATE MATCH</h4>
        <div className="col m12">
          <form id="form-body" className=" form-group col s12">
            <div className="row">

              <div className="input-field col s12 ">
                <input id="park_name" type="text" className="validate" />
                <label htmlFor="park">Park Name</label>
              </div>

              <div className="input-field col s12 ">
                <input id="location" type="text" className="validate" />
                <label htmlFor="location">Location</label>
              </div>

              <div className="input-field col s12">
                <input id="time" type="time" className=" form-control validate" />
              </div>
              <div className="input-field col s12 ">
                <i className="material-icons prefix">mode_edit</i>
                <textarea id="details" className="materialize-textarea"></textarea>
                <label hmtlFor="details">Extra details</label>
              </div>

            </div>
          </form>
        </div>
        <div className="row">
          <div className="col m6 center-align">
            <button onClick={this.handleCreatePublicMatch} type="submit" className="btn-large waves-effect waves-light ">Create public Match</button>

          </div>
          <div className="col m6 center-align">
            <button onClick={this.handleInviteCrew} type="submit" className="btn-large waves-effect waves-light">Invite Crew</button>

          </div>

        </div>
      </div>
    );
  }
});

module.exports = CreateMatchComponent;
