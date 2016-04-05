var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var GamesComponent = React.createClass({displayName: "GamesComponent",
  handleCurrentLocation: function(e){
    e.preventDefault();
  },
  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-md-12"}, 
            React.createElement("h4", null, "GAMES"), 
            React.createElement("input", {id: "zipcode", type: "number", className: "validate"}), 
            React.createElement("button", {onClick: this.handleCurrentLocation, id: "current-location", type: "text", className: "validate"}), 
            React.createElement("button", {className: "btn btn-default"}, "Search Games")
          )
        )
      )
    );
  }
});

module.exports = GamesComponent;