var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');


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
  render: function(){
    var user = localStorage.getItem('username');

    return (
      <div className="row">
        <div className="col-md-12">
          <h3>Hello, </h3>
          <p>{user}</p>
        </div>
        <div className="col-md-12">
          <button onClick={this.handlePublicGames} className="btn btn-default">Games</button>
          <button onClick={this.handleCrewPage} className="btn btn-default">Crew</button>
        </div>

      </div>
    );
  }
});

module.exports = ProfilePageComponent;
