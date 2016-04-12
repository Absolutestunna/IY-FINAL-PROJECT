var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');


var DistanceGamesListComponent = React.createClass({displayName: "DistanceGamesListComponent",
  getInitialState: function(){
    return {
      locations: []
    }
  },
  componentDidMount: function(){




  },

  render: function(){
    return (
      React.createElement("div", null)
    );
  }
});

var Games = React.createClass({displayName: "Games",
  render: function(){
    return(
      React.createElement("div", null)
    );
  }
})

module.exports = DistanceGamesListComponent;