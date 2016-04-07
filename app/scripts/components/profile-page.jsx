var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');
var createFragment = require('react-addons-create-fragment');

var MessagesListComponent = require('./messagesList.jsx');
// Backbone.history.navigate("message", {trigger: true});
// var GameScore = Parse.Object.extend("Invites");

var ProfilePageComponent = React.createClass({
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
    query.equalTo("Recipient", user_email)
    query.include("Sender");
    var names = [];
    var self = this;
    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var sender_info = object.get('Sender');
          var children = createFragment({
            firstName: sender_info.get('first_name'),
            lastName: sender_info.get('last_name'),
            id: object.id
          })
          names.push(children);

          self.handleSendMessageUserInfo(names)

        }
      },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });


  },
  handleSendMessageUserInfo: function(sender){
    console.log(sender);
    localStorage.setItem("senderInfo", JSON.stringify(sender));
    Backbone.history.navigate("message", {trigger: true});
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
      <div className="row profile-page">
        <div className='col m12 right-align'>
            <i onClick={this.handleLogout} className="medium material-icons ">perm_identity</i>
        </div>
        <div className="col-md-12">
          <h3>Hello, </h3>
          <p>{user}</p>
        </div>
        <div className="col-md-12">
          <button onClick={this.handlePublicGames} className="btn btn-default center-align">Games</button>
          <button onClick={this.handleCrewPage} className="btn btn-default center-align">Crew</button>
          <button onClick={this.handleGetMessage} className="btn btn-default center-align">
            <i className="medium material-icons">message</i>
          </button>

        </div>

      </div>
    );
  }
});

module.exports = ProfilePageComponent;
