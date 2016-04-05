var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
require('backbone-react-component');

var WelcomePageComponent = React.createClass({
  handleLogOn: function(e){
    e.preventDefault()
    alert('logon')
    Backbone.history.navigate('logOn', {trigger: true});
  },
  handleSignIn: function(e){
    e.preventDefault()
    alert('sign in')
    Backbone.history.navigate('signIn', {trigger: true});


  },
  render: function(){
    return (
      <div>
        <div className="row" id="welcome-body">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <h2>Welcome to Let's Play</h2>
            <button onClick={this.handleLogOn} className="btn btn-default joinIn">JOIN IN</button>
            <button onClick={this.handleSignIn} className="btn btn-default signIn">SIGN IN</button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = WelcomePageComponent;
