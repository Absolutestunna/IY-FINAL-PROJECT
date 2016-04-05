// 3rd-party dependencies
var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');

// local components
var WelcomePageComponent = require('./components/welcomePage.jsx');
var SignInComponent = require('./components/signin.jsx');
var SignUpComponent = require('./components/signup.jsx');
var ProfilePageComponent = require('./components/profile-page.jsx');






// Router
var Router = Backbone.Router.extend({
  routes: {
    '': 'welcomePage',
    'signUp': 'signUp',
    'signIn': 'signIn',
    'profile': 'profile'
  },
  welcomePage: function(){
    ReactDOM.render(
      React.createElement(WelcomePageComponent), document.getElementById('app')
    );
  },
  signUp: function(){
    ReactDOM.render(
      React.createElement(SignUpComponent), document.getElementById('app')
    );
  },
  signIn: function(){
    ReactDOM.render(
      React.createElement(SignInComponent), document.getElementById('app')
    );
  },
  profile: function(){
    ReactDOM.render(
      React.createElement(ProfilePageComponent), document.getElementById('app')
    );
  }
});

module.exports = Router;
