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
                <p className='description'>Welcome to KickkIT where indecisive friends can play a friendly game of soccer.</p>
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
    );
  }
});

module.exports = WelcomePageComponent;
