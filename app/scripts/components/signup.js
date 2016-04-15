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
  //signup
  handleSignUp: function(e){
    e.preventDefault();
    var userInfo = new Parse.User();
    userInfo.set({
      'first_name': $('#first_name').val(),
      'last_name': $('#last_name').val(),
      'username': $('#username').val(),
      'email': $('#email').val(),
      'password': $('#password').val()
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

  //upload images




  },
  render: function(){
    return (

      React.createElement("div", {className: "row user-information"}, 
        React.createElement("div", {className: "col m12 logo"}, "logo"), 
        React.createElement("div", {className: "col m12 create"}, "CREATE A NEW ACCOUNT FOR LET'S PLAY"), 


          React.createElement("form", {"data-parsley-validate": "", className: "col s12"}, 
            React.createElement("div", {className: "row"}, 

              React.createElement("div", {className: "col m12"}, 
                React.createElement("div", {className: "row first-last"}, 
                  React.createElement("div", {className: "input-field col m12"}, 
                    React.createElement("input", {"data-parsley-minlength": "4", id: "first_name", type: "text", className: "validate", required: ""}), 
                    React.createElement("label", {required: "", htmlFor: "first_name"}, "First Name *")
                  ), 
                  React.createElement("div", {className: "input-field col m12"}, 
                    React.createElement("input", {id: "last_name", type: "text", className: "validate"}), 
                    React.createElement("label", {htmlFor: "last_name"}, "Last Name *")
                  )
                )
              )
            ), 




            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("input", {required: "", id: "username", type: "text", className: "validate"}), 
                React.createElement("label", {htmlFor: "username"}, "Username *")
              )
            ), 

            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("input", {id: "password", type: "password", className: "validate", "data-parsley-minlength": "6", required: ""}), 
                React.createElement("label", {htmlFor: "password"}, "Password *")
              )
            ), 



            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("input", {id: "email", type: "email", className: "validate", "data-parsley-trigger": "change", required: ""}), 
                React.createElement("label", {htmlFor: "email"}, "Email *")
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