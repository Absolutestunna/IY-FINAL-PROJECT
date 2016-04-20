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
          React.createElement("div", {className: "col m12 col s12 col l12 welcome-container"}, 

            React.createElement("div", {className: "row play"}, 
              React.createElement("div", {className: "col m12 col m12 col s12"}, 
                React.createElement("div", {className: "description first-set center-align"}, "WELCOME TO KICKKIT."), 
                React.createElement("div", {className: "description second-set center-align"}, "Let's get a friendly game of soccer.")
              )
            ), 
            React.createElement("div", {id: "signUp", className: "row signup"}, 
              React.createElement("div", {className: "col m12 col s12"}, 
                React.createElement("button", {onClick: this.handleSignUp, className: "btn waves-effect waves-light light-green accent-3 signUp"}, "JOIN NOW")
              )
           ), 
              React.createElement("div", {id: "signIn", className: "row"}, 
                React.createElement("div", {className: "col m12 col s12"}, 
                  React.createElement("button", {onClick: this.handleSignIn, className: "btn waves-effect waves-light grey lighten-1 signIn"}, "SIGN IN")
              )
            ), 
            React.createElement("div", {className: "row logo-container"}, 
              React.createElement("div", {className: "col m12 center-align"}, 
                React.createElement("img", {id: "logo", src: "././images/Kikkitlogo.png", alt: "logo"})
              )
            )
          )
        )
    );
  }
});

module.exports = WelcomePageComponent;