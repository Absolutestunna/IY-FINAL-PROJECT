var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var CrewComponent = React.createClass({
  render: function(){
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h4>MY CREW</h4>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CrewComponent;
