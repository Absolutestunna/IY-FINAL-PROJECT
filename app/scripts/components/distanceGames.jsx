var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');


var DistanceGamesListComponent = React.createClass({
  getInitialState: function(){
    return {
      matchDetails: this.props.app.publicMatches
    }
  },

  render: function(){
      var app = this.props.app.publicMatches;
      var game = this.state.matchDetails.map(function(data){
        console.log('data', data);
        return (<Game
          data={data}
          key={data.id}
          />);
      });
    return (
      <ul className="row">
        {game}
      </ul>
    );
  }
});

var Game = React.createClass({
  render: function(){
    console.log('model is', this.props.data.get('name'));
    return(
      <li className="col m12">
        <div className="row">
          <div className="col m12">
            <h4>{this.props.model.get('name')}</h4>
          </div>
        </div>
      </li>
    );
  }
});

module.exports = DistanceGamesListComponent;
