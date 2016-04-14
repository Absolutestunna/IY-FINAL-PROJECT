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
var MessagesComponent = require('./components/messagesList.jsx');
var CreateMatchComponent = require('./components/createMatch.jsx');
var DistanceGamesComponent = require('./components/distanceGames.jsx');

//collections
var PublicMatchesCollection = require('./collections/publicGamesCollection');


// Router
var Router = Backbone.Router.extend({
  routes: {
    '': 'welcomePage',
    'signUp': 'signUp',
    'signIn': 'signIn',
    'profile': 'profile',
    'crew': 'crew',
    'games': 'games',
    'message': 'message',
    'createMatch': 'createMatch',
    'gamesDistance': 'gamesDistance'
  },
  initialize: function(){
    this.publicMatches = [];
  },
  welcomePage: function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    ReactDOM.render(
      React.createElement(WelcomePageComponent), document.getElementById('app')
    );
  },
  signUp: function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    ReactDOM.render(
      React.createElement(SignUpComponent), document.getElementById('app')
    );
  },
  signIn: function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    ReactDOM.render(
      React.createElement(SignInComponent), document.getElementById('app')
    );
  },
  profile: function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    ReactDOM.render(
      React.createElement(ProfilePageComponent), document.getElementById('app')
    );
  },
  crew: function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    ReactDOM.render(
      React.createElement(CrewComponent), document.getElementById('app')
    );
  },
  games: function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    ReactDOM.render(
      React.createElement(GamesComponent, {app: this}), document.getElementById('app')
    );
  },
  message: function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    ReactDOM.render(
      React.createElement(MessagesComponent), document.getElementById('app')
    );
  },
  createMatch: function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    ReactDOM.render(
      React.createElement(CreateMatchComponent), document.getElementById('app')
    );
  },
  gamesDistance: function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    ReactDOM.render(
      React.createElement(DistanceGamesComponent, {app: this}), document.getElementById('app')
    );
  }
});

module.exports = Router;
