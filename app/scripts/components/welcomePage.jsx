var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
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
        <div className="row" id="welcome-body">
          <div className="col m12 col s12 welcome-container">

            <div className="row play">
              <div className="col m12 col m12 col s12">
                <div className='description first-set center-align'>WELCOME TO KICKKIT.</div>
                <div className='description second-set center-align'>Let's get a friendly game of soccer.</div>
              </div>
            </div>
            <div id="signUp" className="row signup">
              <div className="col m12 col s12">
                <button onClick={this.handleSignUp} className="btn waves-effect waves-light light-green accent-3 signUp">JOIN NOW</button>
              </div>
           </div>
              <div id="signIn" className="row">
                <div className="col m12 col s12">
                  <button onClick={this.handleSignIn} className="btn waves-effect waves-light grey lighten-1 signIn">SIGN IN</button>
              </div>
            </div>
            <div className="row logo-container">
              <div className="col m12 center-align">
                <img id='logo' src='././images/Kikkitlogo.png' alt="logo" />
              </div>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = WelcomePageComponent;
