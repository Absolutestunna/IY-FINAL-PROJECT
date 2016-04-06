var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var CrewComponent = React.createClass({displayName: "CrewComponent",
  handleSlider: function(e){
    e.preventDefault();
    $("#form-body").slideToggle(500);
  },
  handleSendInvite: function(e){
    e.preventDefault();
  },
  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "row crew-container"}, 
          React.createElement("div", {className: "col m12"}, 
            React.createElement("h4", null, "MY CREW")
          ), 
          React.createElement("div", {className: "col m12 right-align add-crew"}, 
            React.createElement("button", {onClick: this.handleSlider, className: "btn-floating btn-large waves-effect waves-light red"}, React.createElement("i", {className: "material-icons"}, "add"))
          ), 
          React.createElement("div", {className: "col m12 crew-pics"}, 
            React.createElement(CrewMemberComponent, null)
          ), 


          React.createElement("form", {id: "form-body", className: "col s12"}, 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("input", {id: "email", type: "email", className: "validate"}), 
                React.createElement("label", {htmlFor: "email", "data-error": "Please enter a valid email address", "data-success": "right"}, "Email")
              ), 
              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("button", {onClick: this.handleSendInvite, className: "btn-large waves-effect waves-light"}, "Send Invite")
              )
            )
          )

      )
    )
    );
  }
});

var CrewMemberComponent = React.createClass({displayName: "CrewMemberComponent",
  render: function(){
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col s2"}, 
          React.createElement("span", {className: "flow-text"}, 
            React.createElement("i", {className: "large material-icons"}, "perm_identity")
          )
        )
        /*<span className="col m3 col s3 col xs6">
          <i className="large material-icons">perm_identity</i>
        </span>*/
      )
    );
  }
});

module.exports = CrewComponent;