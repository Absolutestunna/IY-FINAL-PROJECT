var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
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
      React.createElement("div", null, 
        React.createElement("div", {className: "row", id: "welcome-body"}, 
          React.createElement("div", {className: "col-md-12 col-sm-12 col-xs-12"}, 
            React.createElement("h2", null, "Welcome to Let's Play"), 
            React.createElement("button", {onClick: this.handleSignUp, className: "btn btn-default signUp"}, "JOIN IN"), 
            React.createElement("button", {onClick: this.handleSignIn, className: "btn btn-default signIn"}, "SIGN IN")
          )
        )
      )
    );
  }
});

module.exports = WelcomePageComponent;