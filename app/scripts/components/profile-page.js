var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

// Backbone.history.navigate("message", {trigger: true});
// var GameScore = Parse.Object.extend("Invites");

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
    var user_email = Parse.User.current().getEmail();
    var Invites = Parse.Object.extend("Invites");
    var query = new Parse.Query(Invites);
    query.include("Sender");
    var firstName = "";
    var secondName = "";
    query.find({
      success: function(results) {
        var sender_id;

        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          sender_id = object.get('Sender').id;
        }
        var User = Parse.Object.extend("User");
        var userQuery = new Parse.Query(User);
        userQuery.equalTo('objectId', sender_id)
        userQuery.find({
          success: function(answer){
            answer.map(function(obj){
              firstName = 'first name is' + obj.get('first_name');
              secondName = 'last name is' + obj.get('last_name');
            });
            this.handleSendMessageUserInfo(firstName, secondName)
          },
          error: function(error){
            console.log('error is', error)
          }
        })

      },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });

  },
  handleSendMessageUserInfo: function(first, second){
    console.log(first, second)
  },
  handleLogout: function(e){
    e.preventDefault();
    Parse.User.logOut()
    Backbone.history.navigate('', {trigger: true})
  },
  render: function(){
    var user = Parse.User.current().getUsername();
    console.log(user)
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