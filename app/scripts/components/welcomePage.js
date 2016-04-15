var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var WelcomePageComponent = React.createClass({displayName: "WelcomePageComponent",

  handleSignUp: function(e){
    e.preventDefault();
    Backbone.history.navigate('signUp', {trigger: true});
  },
  handleSignIn: function(e){
    e.preventDefault();
    Backbone.history.navigate('signIn', {trigger: true});
  },
  render: function(){

    return (

        React.createElement("div", {className: "row", id: "welcome-body"}, 
          React.createElement("div", {className: "col m12 col s12 welcome-container"}, 
            React.createElement("div", {className: "row play"}, 
              React.createElement("div", {className: "col m12 col m12 col s12"}, 
                React.createElement("p", {className: "description"}, "Welcome to KickkIT where indecisive friends can play a friendly game of soccer.")
              )
            ), 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col m12 col m12 col s12"}, 
                React.createElement("button", {onClick: this.handleSignUp, className: "btn waves-effect waves-light signUp"}, "JOIN IN")
              )
           ), 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col m12 col m12 col s12"}, 
                  React.createElement("button", {onClick: this.handleSignIn, className: "btn waves-effect waves-light signIn"}, "SIGN IN")
              )
            )
          )
        )
    );
  }
});

module.exports = WelcomePageComponent;