var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');
var createFragment = require('react-addons-create-fragment');

var MessagesListComponent = require('./messagesList.jsx');


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
  handleGetMessage: function(e){
    e.preventDefault();
    Backbone.history.navigate("message", {trigger: true});

  },
  handleLogout: function(e){
    e.preventDefault();
    Parse.User.logOut()
    Backbone.history.navigate('', {trigger: true})
  },
  render: function(){
    var user = Parse.User.current().getUsername();
    console.log(Parse.User.emailVerified);

    return (
      React.createElement("div", {className: "row profile-page"}, 
        React.createElement("div", {className: "col m12 right-align"}, 
            React.createElement("i", {onClick: this.handleLogout, className: "medium material-icons "}, "perm_identity")
        ), 
        React.createElement("div", {className: "col-md-12"}, 
          React.createElement("h3", null, "Hello, "), 
          React.createElement("p", null, user)
        ), 
        React.createElement("div", {className: "col-md-12"}, 
          React.createElement("button", {onClick: this.handlePublicGames, className: "btn btn-default center-align"}, "Games"), 
          React.createElement("button", {onClick: this.handleCrewPage, className: "btn btn-default center-align"}, "Crew"), 
          React.createElement("button", {onClick: this.handleGetMessage, className: "btn btn-default center-align"}, 
            React.createElement("i", {className: "medium material-icons"}, "message")
          )

        )

      )
    );
  }
});

module.exports = ProfilePageComponent;