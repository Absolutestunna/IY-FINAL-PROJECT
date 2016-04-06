var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var MessagesComponent = React.createClass({displayName: "MessagesComponent",
  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement(Message, null)
      )
    );
  }
});

var Message = React.createClass({displayName: "Message",
  render: function(){
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col m8"}, "Hello"), 
        React.createElement("div", {className: "col m4 right-align"}, 
          React.createElement("button", {className: "btn-floating btn-large waves-effect waves-light red"}, React.createElement("i", {className: "material-icons"}, "done"))
        )
      )

    );
  }
});

module.exports = MessagesComponent;