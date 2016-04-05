var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

$(function(){
  Parse.initialize("tiy-gvl");
  Parse.serverURL = 'http://lets-play-final.herokuapp.com/';
});


var SignUpComponent = React.createClass({displayName: "SignUpComponent",
  mixins: [Backbone.React.Component.mixin],
  handleSignUp: function(e){
    e.preventDefault();
    console.log("signup")
    var userInfo = new Parse.User();
    userInfo.set({
      'first_name': $('#first_name').val(),
      'last_name': $('#last_name').val(),
      'username': $('#username').val(),
      'email': $('#email').val(),
      'password': $('#password').val(),
      'zipcode': parseInt($('#zipcode').val())
    });
    userInfo.signUp(null, {
      success: function(results){
        console.log("results: ", results);
        Backbone.history.navigate("profile", {trigger: true});
      },
      error: function(user, error){
        $('.error').html('<p>' + "* " + error.message + '</p>');
        console.log(user, error);
      }
    });
  },
  render: function(){
    return (

      React.createElement("div", {className: "row user-information"}, 
        React.createElement("div", {className: "col m12 logo"}, "logo"), 
        React.createElement("div", {className: "col m12 create"}, "CREATE A NEW ACCOUNT FOR LET'S PLAY"), 

          React.createElement("form", {className: "col s12"}, 
            React.createElement("div", {className: "row first-last"}, 
              React.createElement("div", {className: "input-field col m6 col s12"}, 
                React.createElement("input", {id: "first_name", type: "text", className: "validate"}), 
                React.createElement("label", {htmlFor: "first_name"}, "First Name")
              ), 
              React.createElement("div", {className: "input-field col m6 col s12"}, 
                React.createElement("input", {id: "last_name", type: "text", className: "validate"}), 
                React.createElement("label", {htmlFor: "last_name"}, "Last Name")
              )
            ), 

            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("input", {id: "username", type: "text", className: "validate"}), 
                React.createElement("label", {htmlFor: "username"}, "Username")
              )
            ), 

            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("input", {id: "password", type: "password", className: "validate"}), 
                React.createElement("label", {htmlFor: "password"}, "Password")
              )
            ), 



            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("input", {id: "email", type: "email", className: "validate"}), 
                React.createElement("label", {htmlFor: "email"}, "Email")
              )
            ), 

            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("input", {id: "zipcode", type: "text", className: "validate"}), 
                React.createElement("label", {htmlFor: "zipcode"}, "Zipcode")
              )
            ), 


            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("button", {onClick: this.handleSignUp, className: "waves-effect waves-light btn submit"}, "SUBMIT")
              )
            ), 

            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("div", {className: "error"})
              )
            )



          )
        )
    );
  }
});

module.exports = SignUpComponent;