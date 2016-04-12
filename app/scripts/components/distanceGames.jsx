var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');


var DistanceGamesListComponent = React.createClass({
  getInitialState: function(){
    return {
      locations: []
    }
  },
  componentDidMount: function(){




  },

  render: function(){
    return (
      <div></div>
    );
  }
});

var Games = React.createClass({
  render: function(){
    return(
      <div></div>
    );
  }
})

module.exports = DistanceGamesListComponent;
