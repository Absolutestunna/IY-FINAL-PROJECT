var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var moment = require('moment');
require('backbone-react-component');



var CreateMatchComponent = React.createClass({displayName: "CreateMatchComponent",
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
    });
    Backbone.history.navigate('games', {trigger: true})
},
  render: function(){
    return (
      React.createElement("div", {className: "row match-container"}, 
        React.createElement("h4", {className: "col m12 center-align createMatch"}, "CREATE MATCH"), 
        React.createElement("div", {className: "col m12"}, 
          React.createElement("form", {id: "form-body", className: " form-group col s12"}, 
            React.createElement("div", {className: "row"}, 

              React.createElement("div", {className: "input-field col s12 "}, 
                React.createElement("input", {id: "park_name", type: "text", className: "validate"}), 
                React.createElement("label", {htmlFor: "park"}, "Park Name")
              ), 

              React.createElement("div", {className: "input-field col s12 "}, 
                React.createElement("input", {id: "location", type: "text", className: "validate"}), 
                React.createElement("label", {htmlFor: "location"}, "Location")
              ), 

              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("input", {id: "time", type: "time", className: " form-control validate"})
              )

            )
          )
        ), 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col m6 center-align"}, 
            React.createElement("button", {onClick: this.handleCreatePublicMatch, type: "submit", className: "btn-large waves-effect waves-light "}, "Create public Match")

          ), 
          React.createElement("div", {className: "col m6 center-align"}, 
            React.createElement("button", {type: "submit", className: "btn-large waves-effect waves-light"}, "Invite Crew")

          )

        )
      )
    );
  }
});

module.exports = CreateMatchComponent;