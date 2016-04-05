// 3rd-party dependencies

var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');

// local components
var WelcomePageComponent = require('./components/welcomePage.jsx');





// Router
var Router = Backbone.Router.extend({
  routes: {
    '': 'welcomePage',
    'logOn': 'logOn',
    'signIn': 'signIn'
  },
  welcomePage: function(){
    ReactDOM.render(
      React.createElement(WelcomePageComponent), document.getElementById('app')
    );
  },
  logOn: function(){
    ReactDOM.render(
      React.createElement(WelcomePageComponent), document.getElementById('app')
    );
  },
  signIn: function(){
    ReactDOM.render(
      React.createElement(WelcomePageComponent), document.getElementById('app')
    );
  }
});

module.exports = Router;
