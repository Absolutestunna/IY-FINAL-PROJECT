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
  handleSignUp: function(e){
    e.preventDefault();
    console.log("signup")
    var userInfo = new Parse.User();
    userInfo.set({
      'first_name': $('#first_name').val(),
      'last_name': $('#last_name').val(),
      'username': $('#username').val(),
      'email': $('#email').val(),
      'password': $('#password').val(),
      'zipcode': $('#zipcode').val()
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
  },
  render: function(){
    return (
        <div className="row signin">
            <form className="col-md-12">
              <div className="row">
                <div className="input-field col-xs-12 col-sm-12 col-md-6">
                  <input id="first_name" type="text" className="validate" />
                  <label htmlFor="first_name">First Name</label>
                </div>
                <div className="input-field col-xs-12 col-sm-12 col-md-6">
                  <input id="last_name" type="text" className="validate" />
                  <label htmlFor="last_name">Last Name</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col-md-12">
                  <input id="password" type="password" className="validate" />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col-md-12">
                  <input id="email" type="email" className="validate" />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col-md-12">
                  <input id="username" type="text" className="validate" />
                  <label htmlFor="username">Username</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col-md-12">
                  <input id="zipcode" type="text" className="validate" />
                  <label htmlFor="number">Zipcode</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col-md-12">
                  <button onClick={this.handleSignUp} id="login-submit" className="btn btn-default waves-effect waves-light validate" type="submit">SUBMIT</button>
                </div>
              </div>
              <div className="row">
                <div className="input-field col-md-12">
                  <div className="error"></div>
                </div>
              </div>
            </form>
        </div>


    );
  }
});

module.exports = SignUpComponent;
