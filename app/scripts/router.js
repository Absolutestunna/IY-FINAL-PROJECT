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
var CrewComponent = require('./components/crew.jsx');
var GamesComponent = require('./components/games.jsx');





// Router
var Router = Backbone.Router.extend({
  routes: {
    '': 'welcomePage',
    'signUp': 'signUp',
    'signIn': 'signIn',
    'profile': 'profile',
    'crew': 'crew',
    'games': 'games'
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
  },
  crew: function(){
    ReactDOM.render(
      React.createElement(CrewComponent), document.getElementById('app')
    );
  },
  games: function(){
    ReactDOM.render(
      React.createElement(GamesComponent), document.getElementById('app')
    );
  }
});

module.exports = Router;
