var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var MessagesComponent = React.createClass({
  render: function(){
    return (
      <div>
        <Message />
      </div>
    );
  }
});

var Message = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="col m8">Hello</div>
        <div className="col m4 right-align">
          <button className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">done</i></button>
        </div>
      </div>

    );
  }
});

module.exports = MessagesComponent;
