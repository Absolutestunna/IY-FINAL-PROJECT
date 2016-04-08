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
    }
  },
  handleAccept: function(model, e){
    e.preventDefault();
    var modelID = model.user_id;

    console.log('modelID is: ', modelID);
    var AcceptInvite = Parse.Object.extend("Invites");
    var acceptQuery = new Parse.Query(AcceptInvite);
    acceptQuery.get(modelID, {
      success: function(result){
        var sender = result.get("Sender");
        var user = Parse.User.current();
        var relation = user.relation("crew");
        relation.add(sender);
        user.save();
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
    var user_email = Parse.User.current().getEmail();
    var Invites = Parse.Object.extend("Invites");
    var query = new Parse.Query(Invites);
    query.equalTo("Recipient", user_email)
    query.include("Sender");
    var names = [];
    var self = this;
    query.find({
      success: function(results) {
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
        <div>
          <ul className="container collection with-header">
            <li className="collection-header"><h4>Your Messages</h4></li>
          {eachMessage}
          </ul>
        </div>
      );
    }
});

var Message = React.createClass({
  render: function(){
    var nameMod = this.props.sender;
    return (
      <li className="row collection-header">
          <div className="col m10">Please accept {nameMod.firstName + " " + nameMod.lastName}&#39;s invitation to join their crew</div>
          <div className="col m1 right-align">
            <button onClick={this.props.handleAccept.bind(this, nameMod)} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">done</i></button>
          </div>
          <div className="col m1 right-align">
            <button onClick={this.props.handleReject.bind(this, nameMod)} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">thumb_down</i></button>
          </div>
      </li>

    );
  }
});

module.exports = MessagesComponent;
