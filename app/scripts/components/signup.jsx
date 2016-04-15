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
      'password': $('#password').val(),
      'zipcode': parseInt($('#zipcode').val())
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
        <div className="col m12 logo">logo</div>
        <div className="col m12 create">CREATE A NEW ACCOUNT FOR LET'S PLAY</div>


          <form data-parsley-validate="" className="col s12">
            <div className="row">

              <div className="col m12">
                <div className="row first-last">
                  <div className="input-field col m12">
                    <input data-parsley-minlength="4" id="first_name" type="text" className="validate" required="" />
                    <label required="" htmlFor="first_name">First Name *</label>
                  </div>
                  <div className="input-field col m12">
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



            <div className="row">
              <div className="input-field col s12">
                <button onClick={this.handleSignUp} className="waves-effect waves-light btn submit">SUBMIT</button>
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
