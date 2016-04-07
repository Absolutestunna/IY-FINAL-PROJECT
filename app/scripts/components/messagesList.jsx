var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var MessagesComponent = React.createClass({
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
        <Message
          sender={model}
          key={index}
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
    return (
      <li className="row collection-header">
          <div className="col m10">Please accept {this.props.sender}&#39;s invitation to join their crew</div>
          <div className="col m1 right-align">
            <button onClick={this.props.handleAccept} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">done</i></button>
          </div>
          <div className="col m1 right-align">
            <button onClick={this.props.handleReject} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">thumb_down</i></button>
          </div>
      </li>

    );
  }
});

module.exports = MessagesComponent;
