var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var CrewComponent = React.createClass({displayName: "CrewComponent",
  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-md-12"}, 
            React.createElement("h4", null, "MY CREW")
          )
        )
      )
    );
  }
});

module.exports = CrewComponent;