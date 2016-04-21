var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

$(function(){
  Parse.initialize("tiy-gvl");
  Parse.serverURL = 'http://lets-play-final.herokuapp.com/';
});


var SignUpComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  //signup
  handleSignUp: function(e){
    e.preventDefault();
    var userInfo = new Parse.User();
    userInfo.set({
      'first_name': $('#first_name').val(),
      'last_name': $('#last_name').val(),
      'username': $('#username').val(),
      'email': $('#email').val(),
      'password': $('#password').val()
    });
    userInfo.signUp(null, {
      success: function(results){
        console.log("results: ", results);
        Backbone.history.navigate("profile", {trigger: true});
      },
      error: function(user, error){
        $('.error').html('<p>' + "* " + error.message + '</p>');
        console.log(user, error);
      }
    });

  //upload images




  },
  render: function(){
    return (

      <div className="row user-information">
        <div className="col xs12 col s12 col l12 col m12 logo left-align">
          <img id="signup-logo" src="././images/logo.png"/>
        </div>
        <div className="col xs12 col s12 col l12 col m12 create">CREATE A NEW ACCOUNT FOR KICKKIT</div>

          <form data-parsley-validate="" className="col xs12 col s12 col l12 col m12">
            <div className="row">
              <div className="col xs12 col s12 col l12 col m12">
                <div className="row first-last">
                  <div className="input-field col xs6 col s6 col l6 col m6">
                    <input data-parsley-minlength="4" id="first_name" type="text" className="validate" required="" />
                    <label required="" htmlFor="first_name">First Name *</label>
                  </div>
                  <div className="input-field col xs6 col s6 col l6 col m6">
                    <input id="last_name" type="text" className="validate" />
                    <label htmlFor="last_name">Last Name *</label>
                  </div>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="input-field col s12">
                <input required="" id="username" type="text" className="validate" />
                <label htmlFor="username">Username *</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" data-parsley-minlength="6" required="" />
                <label htmlFor="password">Password *</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" className="validate" data-parsley-trigger="change" required=""/>
                <label htmlFor="email">Email *</label>
              </div>
            </div>

            <div className="row submit">
              <div className="input-field col s12 center-align">
                <button onClick={this.handleSignUp} className="waves-effect waves-light btn submit light-green accent-3">SIGN UP</button>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <div className='error'></div>
              </div>
            </div>



          </form>
        </div>
    );
  }
});

module.exports = SignUpComponent;
