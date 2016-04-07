var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');
var createFragment = require('react-addons-create-fragment');

var MessagesListComponent = require('./messagesList.jsx');


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
    Backbone.history.navigate("message", {trigger: true});

  },
  handleLogout: function(e){
    e.preventDefault();
    Parse.User.logOut()
    Backbone.history.navigate('', {trigger: true})
  },
  render: function(){
    var user = Parse.User.current().getUsername();
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
