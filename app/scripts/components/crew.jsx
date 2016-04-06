var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var CrewComponent = React.createClass({
  handleSlider: function(e){
    e.preventDefault();
    $("#form-body").slideToggle(500);
  },
  handleSendInvite: function(e){
    e.preventDefault();
  },
  render: function(){
    return (
      <div>
        <div className="row crew-container">
          <div className="col m12">
            <h4>MY CREW</h4>
          </div>
          <div className="col m12 right-align add-crew">
            <button onClick={this.handleSlider} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></button>
          </div>
          <div className="col m12 crew-pics">
            <CrewMemberComponent />
          </div>


          <form id="form-body" className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" className="validate" />
                <label htmlFor="email" data-error="Please enter a valid email address" data-success="right">Email</label>
              </div>
              <div className="input-field col s12">
                <button onClick={this.handleSendInvite} className="btn-large waves-effect waves-light">Send Invite</button>
              </div>
            </div>
          </form>

      </div>
    </div>
    );
  }
});

var CrewMemberComponent = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="col s2">
          <span className="flow-text">
            <i className="large material-icons">perm_identity</i>
          </span>
        </div>
        {/*<span className="col m3 col s3 col xs6">
          <i className="large material-icons">perm_identity</i>
        </span>*/}
      </div>
    );
  }
});

module.exports = CrewComponent;
