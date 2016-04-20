var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var MessagesComponent = React.createClass({displayName: "MessagesComponent",
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
          React.createElement(Message, {
            sender: model, 
            key: model.user_id, 
            handleReject: self.handleReject, 
            handleAccept: self.handleAccept}
            )
        );
      })
      return (
        React.createElement("div", null, 
          React.createElement("ul", {className: "container collection with-header"}, 
            React.createElement("li", {className: "collection-header"}, React.createElement("h4", null, "Your Messages")), 
          eachMessage
          )
        )
      );
    }
});

var Message = React.createClass({displayName: "Message",
  render: function(){
    var nameMod = this.props.sender;
    return (
      React.createElement("li", {className: "collection-header"}, 
          React.createElement("div", {className: "col m10"}, "Please accept ", nameMod.firstName + " " + nameMod.lastName, "'s invitation to join their crew"), 
          React.createElement("div", {className: "col m1 right-align"}, 
            React.createElement("button", {onClick: this.props.handleAccept.bind(this, nameMod), className: "btn-floating btn-large waves-effect waves-light red"}, React.createElement("i", {className: "material-icons"}, "done"))
          ), 
          React.createElement("div", {className: "col m1 right-align"}, 
            React.createElement("button", {onClick: this.props.handleReject.bind(this, nameMod), className: "btn-floating btn-large waves-effect waves-light red"}, React.createElement("i", {className: "material-icons"}, "thumb_down"))
          )
      )

    );
  }
});

module.exports = MessagesComponent;