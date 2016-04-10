var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
var moment = require('moment');
require('backbone-react-component');


//
// var express = require('express');
// var app = express();
// app.get('/', function (req, res) {
//   res.send('Hello World');
// })
//
// app.listen(3000);
// // var port = process.env.PORT || 8080;
// // var client = require('twilio')('AC5acb2bf152bfec7f4eb2130780cb3254', '87805b743b3ba49ea077bbbcc38f62c1');

var CreateMatchComponent = React.createClass({displayName: "CreateMatchComponent",
  getInitialState: function(){
    return {
      location: "",
      time: "",
      creator: null
    }
  },


  handleCreatePublicMatch: function(e){
    e.preventDefault();
    var currentUser = Parse.User.current();
    var PuMatch = Parse.Object.extend("pumatch");
    var puMatch = new PuMatch();
    puMatch.set({
      location: $("#location").val(),
      time: $("#time").val(),
      creator: currentUser
    });
    puMatch.save(null, {
      success: function(info) {
            console.log('New object created with objectId: ' + info.id);
        },
      error: function(info, error) {
        console.log('Failed to create new object, with error code: ' + error.message);
        }
    });

  },

  render: function(){

    return (
      React.createElement("div", {className: "row match-container"}, 
        React.createElement("h4", {className: "col m12 center-align createMatch"}, "CREATE MATCH"), 
        React.createElement("div", {className: "col m12"}, 
          React.createElement("form", {id: "form-body", className: " form-group col s12"}, 
            React.createElement("div", {className: "row"}, 


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