var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');


var ProfilePageComponent = React.createClass({displayName: "ProfilePageComponent",
  mixins: [Backbone.React.Component.mixin],
  handlePublicGames: function(e){
    e.preventDefault();
    Backbone.history.navigate("games", {trigger: true});
  },
  handleCrewPage: function(e){
    e.preventDefault();
    Backbone.history.navigate("crew", {trigger: true});

  },
  render: function(){
    var user = localStorage.getItem('username');

    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-md-12"}, 
          React.createElement("h3", null, "Hello, "), 
          React.createElement("p", null, user)
        ), 
        React.createElement("div", {className: "col-md-12"}, 
          React.createElement("button", {onClick: this.handlePublicGames, className: "btn btn-default"}, "Games"), 
          React.createElement("button", {onClick: this.handleCrewPage, className: "btn btn-default"}, "Crew")
        )

      )
    );
  }
});

module.exports = ProfilePageComponent;