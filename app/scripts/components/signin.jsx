var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var SignInComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  handleSignIn: function(e){
   var username = $('#username1').val();
   var password = $('#password1').val();
   console.log(username, password);

   Parse.User.logIn(username, password, {
     success: function(user) {
       console.log(user);
       console.log("Hello ",  user);
       Backbone.history.navigate("profile", {trigger: true});
     },
     error: function(user, error) {
       // The login failed. Check error to see why.
       console.log(error);
       $('#error').html('<p>' + "* " + error.message + '</p>');

     }
    });
 },
  render: function(){
    return (
      <div className="row sign-in">
        <div className="col m12 logo1 left-align">
          <img id="signin-logo" src="././images/logo.png"/>
        </div>
        <div className="col m12 create1">LOG IN TO KICKKIT</div>
          <div className="input-field col-md-12">
            <input id="username1" type="text" className="validate" />
            <label htmlFor="email">Username</label>
          </div>

          <div className="input-field col-md-12">
            <input id="password1" type="password" className="validate" />
            <label htmlFor="password">Password</label>
          </div>

        <div className="row signInButton">
          <div className="input-field col-md-12 center-align">
            <button onClick={this.handleSignIn} id="login-submit" className="btn btn-default waves-effect waves-light light-green accent-3 m validate" type="submit">SIGN IN</button>
          </div>
        </div>

        <div className="row">
          <div className="input-field col-md-12">
            <div id="error"></div>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = SignInComponent;
