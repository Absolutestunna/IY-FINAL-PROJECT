var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var SignInComponent = React.createClass({displayName: "SignInComponent",
  mixins: [Backbone.React.Component.mixin],
  handleSignIn: function(e){
   var username = $('#username1').val();
   var password = $('#password1').val();
   console.log(username, password);

   Parse.User.logIn(username, password, {
     success: function(user) {
       console.log(user);
       console.log("Hello ",  user);
       Backbone.history.navigate("profile", {trigger: true});
     },
     error: function(user, error) {
       // The login failed. Check error to see why.
       console.log(error);
       $('#error').html('<p>' + "* " + error.message + '</p>');

     }
    });
 },
  render: function(){
    return (
      React.createElement("div", {className: "row sign-in"}, 
        React.createElement("div", {className: "col m12 logo1"}, "logo"), 
        React.createElement("div", {className: "col m12 create1"}, "LOG IN TO KICK"), 
          React.createElement("div", {className: "input-field col-md-12"}, 
            React.createElement("input", {id: "username1", type: "text", className: "validate"}), 
            React.createElement("label", {htmlFor: "email"}, "Username")
          ), 

          React.createElement("div", {className: "input-field col-md-12"}, 
            React.createElement("input", {id: "password1", type: "password", className: "validate"}), 
            React.createElement("label", {htmlFor: "password"}, "Password")
          ), 

        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "input-field col-md-12"}, 
            React.createElement("button", {onClick: this.handleSignIn, id: "login-submit", className: "btn btn-default waves-effect waves-light validate", type: "submit"}, "SUBMIT")
          )
        ), 

        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "input-field col-md-12"}, 
            React.createElement("div", {id: "error"})
          )
        )

      )
    );
  }
});

module.exports = SignInComponent;