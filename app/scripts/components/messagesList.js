var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var MessagesComponent = React.createClass({displayName: "MessagesComponent",
  getInitialState: function(){
    return{
      senders: this.props.senderInfo
    }
  },
  handleAccept: function(e){
    e.preventDefault();
  },
  handleReject: function(e){
    e.preventDefault();
  },
  render: function(){
    console.log(this.state.senders);
    var save_id = "";
    var self = this;
    var eachMessage = this.state.senders.map(function(model, index){
      console.log(model)
      return (
        React.createElement(Message, {
          sender: model, 
          key: index, 
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
    return (
      React.createElement("li", {className: "row collection-header"}, 
          React.createElement("div", {className: "col m10"}, "Please accept ", this.props.sender, "'s invitation to join their crew"), 
          React.createElement("div", {className: "col m1 right-align"}, 
            React.createElement("button", {onClick: this.props.handleAccept, className: "btn-floating btn-large waves-effect waves-light red"}, React.createElement("i", {className: "material-icons"}, "done"))
          ), 
          React.createElement("div", {className: "col m1 right-align"}, 
            React.createElement("button", {onClick: this.props.handleReject, className: "btn-floating btn-large waves-effect waves-light red"}, React.createElement("i", {className: "material-icons"}, "thumb_down"))
          )
      )

    );
  }
});

module.exports = MessagesComponent;