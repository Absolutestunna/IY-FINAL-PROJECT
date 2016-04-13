var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');


var DistanceGamesListComponent = React.createClass({displayName: "DistanceGamesListComponent",
  getInitialState: function(){
    return {
      matchDetails: this.props.app.publicMatches
    }
  },

  render: function(){
      var app = this.props.app.publicMatches;
      var game = this.state.matchDetails.map(function(data){
        console.log('data', data);
        return (React.createElement(Game, {
          data: data, 
          key: data.id}
          ));
      });
    return (
      React.createElement("ul", {className: "row"}, 
        game
      )
    );
  }
});

var Game = React.createClass({displayName: "Game",
  render: function(){
    console.log('model is', this.props.data.get('name'));
    return(
      React.createElement("li", {className: "col m12"}, 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col m12"}, 
            React.createElement("h4", null, this.props.model.get('name'))
          )
        )
      )
    );
  }
});

module.exports = DistanceGamesListComponent;