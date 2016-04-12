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
    var query = new Parse.Query("pumatch");
    query.find({
    success: function(object) {
      var location = localStorage.getItem('location')
      var newLocation = JSON.parse(location);
      console.log(typeof(newLocation));

        // object is an instance of Parse.Object.
        object.map(function(address){
          console.log(address.get('geoPoint').milesTo(newLocation));
        })
    },
    error: function(object, error) {
        // error is an instance of Parse.Error.
        console.log(error);
    }
});


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