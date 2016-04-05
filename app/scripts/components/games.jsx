var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var GamesComponent = React.createClass({
  handleCurrentLocation: function(e){
    e.preventDefault();
  },
  render: function(){
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h4>GAMES</h4>
            <input id="zipcode" type="number" className="validate" />
            <button onClick={this.handleCurrentLocation} id="current-location" type="text" className="validate"></button>
            <button className="btn btn-default">Search Games</button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = GamesComponent;
