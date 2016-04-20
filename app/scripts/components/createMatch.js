var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var moment = require('moment');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
require('backbone-react-component');


var InviteModel = require("./../collections/InviteModel");

var CreateMatchComponent = React.createClass({displayName: "CreateMatchComponent",
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  getInitialState: function(){
    return {
      geoLocation: null,
      name: "",
      time: null,
      location: "",
      details: "",
      crewNumbers: []
    }
  },
  componentWillMount: function(){
    if (!Parse.User.current()){
      Backbone.history.navigate('', {trigger: true});
    }
    var queryNumbers = new Parse.Query(Parse.User);
    var self = this;
    queryNumbers.find({
      success: function(results){
       var crewNumbers = results.map(function(number){
          return number.get('Phone');
        });
        self.setState({crewNumbers: crewNumbers});
      },
      error: function(error){
        console.log(error);
      }
    })
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
  var state = this.state
  var validNumbers = this.state.crewNumbers.filter(function(number){
    return number !== undefined;
  });
  console.log(validNumbers);
  var data = {
    name: state.name,
    time: state.time,
    location: state.location,
    details: state.details,
    user: Parse.User.current().get('username'),
    validNumbers: validNumbers

  }
  console.log(data);
  var invite = new InviteModel();
    invite.set('data', data);
    invite.save();

},
  render: function(){

    return (
      React.createElement("div", {className: "row match-container"}, 
        React.createElement("h4", {className: "col m12 center-align createMatch"}, "CREATE YOUR MATCH"), 
        React.createElement("div", {className: "col m12"}, 
          React.createElement("form", {id: "form-body", className: " form-group col s12"}, 
            React.createElement("div", {className: "row"}, 

              React.createElement("div", {className: "input-field col s12 "}, 
                React.createElement("input", {valueLink: this.linkState('name'), id: "park_name", type: "text", className: "validate"}), 
                React.createElement("label", {htmlFor: "park"}, "Park Name")
              ), 

              React.createElement("div", {className: "input-field col s12 "}, 
                React.createElement("input", {valueLink: this.linkState('location'), id: "location", type: "text", className: "validate"}), 
                React.createElement("label", {htmlFor: "location"}, "Location")
              ), 

              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("input", {valueLink: this.linkState('time'), id: "time", type: "time", className: " form-control validate"})
              ), 
              React.createElement("div", {className: "input-field col s12 "}, 
                React.createElement("i", {className: "material-icons prefix"}, "mode_edit"), 
                React.createElement("textarea", {valueLink: this.linkState('details'), id: "details", className: "materialize-textarea"}), 
                React.createElement("label", {hmtlFor: "details"}, "Extra details")
              )

            )
          )
        ), 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col m6 center-align"}, 
            React.createElement("button", {onClick: this.handleCreatePublicMatch, type: "submit", className: "public-match btn-large waves-effect waves-light light-green accent-3"}, "PUBLIC MATCH")

          ), 
          React.createElement("div", {className: "col m6 center-align"}, 
            React.createElement("button", {onClick: this.handleInviteCrew, type: "submit", className: "crew-match btn-large waves-effect waves-light light-green accent-3"}, "PRIVATE MATCH")

          )

        )
      )
    );
  }
});

module.exports = CreateMatchComponent;