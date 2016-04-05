var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
require('backbone-react-component');

var WelcomePageComponent = React.createClass({
  handleSignUp: function(e){
    e.preventDefault();
    Backbone.history.navigate('signUp', {trigger: true});
  },
  handleSignIn: function(e){
    e.preventDefault();
    Backbone.history.navigate('signIn', {trigger: true});
  },
  render: function(){
    return (

      <div>
        <div className="row" id="welcome-body">
          <div className="col m12 col s12 welcome-container">
            <div className="row play">
              <div className="col m12 col m12 col s12">
                <h2>Welcome to Let's Play</h2>
              </div>
            </div>
            <div className="row">
              <div className="col m12 col m12 col s12">
                <button onClick={this.handleSignUp} className="btn waves-effect waves-light signUp">JOIN IN</button>
              </div>
           </div>
              <div className="row">
                <div className="col m12 col m12 col s12">
                  <button onClick={this.handleSignIn} className="btn waves-effect waves-light signIn">SIGN IN</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = WelcomePageComponent;
