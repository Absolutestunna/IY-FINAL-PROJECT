var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var MessagesComponent = React.createClass({
  getInitialState: function(){
    return{
      'names': [],
      'message': 'No new message'
    }
  },
  handleAccept: function(model, e){
    e.preventDefault();
    var modelID = model.user_id;

    var AcceptInvite = Parse.Object.extend("Invites");
    var acceptQuery = new Parse.Query(AcceptInvite);
    acceptQuery.get(modelID, {
      success: function(result){
        var sender = result.get("Sender");
        var user = Parse.User.current();
        var relation = user.relation("crew");
        relation.add(sender);
        user.save();
        result.destroy({});
      },
      error: function(error){
        console.log(error);
      }
    })
    var filterNames = this.state.names.filter(function(item){
      return (item.user_id !== modelID);
    })
    this.setState({
      'names': filterNames
    });

  },
  handleReject: function(model, e){
    e.preventDefault();
    var modelID = model.user_id;
    var RejectInvite = Parse.Object.extend("Invites");
    var rejectQuery = new Parse.Query(RejectInvite);
    rejectQuery.get(modelID, {
      success: function(result){
        console.log('this is successful', result)
        result.destroy({});
      },
      error: function(error){
        console.log(error);
      }
    });
    var filterNames = this.state.names.filter(function(item){
      return (item.user_id !== modelID);
    })
    this.setState({
      'names': filterNames
    });

  },

  componentDidMount: function(){
    if (!Parse.User.current()){
      Backbone.history.navigate('', {trigger: true});
    }
    var user_email = Parse.User.current().getEmail();
    var Invites = Parse.Object.extend("Invites");
    var query = new Parse.Query(Invites);
    query.equalTo("Recipient", user_email)
    query.include("Sender");
    var names = [];
    var self = this;
    query.find({
      success: function(results) {
        if (results.length <= 0){
          $('.invitations-header').append('<li className="collection-header"><h5>There are no new invitations<h5></li>');
        }
        console.log('mess result', results);
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var sender_info = object.get('Sender');

          var children = ({
            firstName: sender_info.get('first_name'),
            lastName: sender_info.get('last_name'),
            user_id: object.id
          });
          names.push(children)
        }
        self.setState({
          'names': names
        })
      },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
  },

  handleLogout: function(e){
    console.log('logout');
    e.preventDefault();
    Parse.User.logOut();
    Backbone.history.navigate('', {trigger: true})
  },
  render: function(){
      var save_id = "";
      var self = this;
      var eachMessage = this.state.names.map(function(model, index){
        return (
          <Message
            sender={model}
            key={model.user_id}
            handleReject={self.handleReject}
            handleAccept={self.handleAccept}
            />
        );
      })
      return (
        <div >
          <div className="invite-nav row">
            <div className="invitation-logo left-align col m9 col s9 col xs 9">
              <img id="invitation-logo" src="././images/Kikkitlogo.png"/>
            </div>
            <div className="col m3 col s3 col xs3 col l3 right-align">
              <a className="invitation-sign-out">
                <i onClick={this.handleLogout} className="fa fa-sign-out fa-3x" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div className="row">
            <ul className="invitations collection with-header">
              <li className="center-align collection-header invitations-header">
                <h4>INVITATIONS</h4>
              </li>
            {eachMessage}
            </ul>
          </div>

        </div>
      );
    }
});

var Message = React.createClass({
  render: function(){
    var nameMod = this.props.sender;
    return (
      <li className="row collection-header each-invite">
          <div className="col m8 col l8 col xs8 col s8 left-align nameMod">Please accept {nameMod.firstName + " " + nameMod.lastName}&#39;s invitation to join their crew</div>
          <div className="col m2 col l2 xs2 col s2 right-align">
            <a onClick={this.props.handleAccept.bind(this, nameMod)} className="btn-tiny btn-floating btn-large waves-effect waves-light light-green accent-3"><i className="material-icons">done</i></a>
          </div>
          <div className="col m2 col l2 xs2 col s2 right-align">
            <button onClick={this.props.handleReject.bind(this, nameMod)} className="btn-floating btn-large waves-effect waves-light grey darken-1"><i className="material-icons">thumb_down</i></button>
          </div>
      </li>

    );
  }
});

module.exports = MessagesComponent;
