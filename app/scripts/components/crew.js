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
  componentWillMount: function(){
    var userID = Parse.User.current().id;
    var userCrewQuery = new Parse.Query(Parse.User);
    userCrewQuery.equalTo("objectId", userID);
    userCrewQuery.include("crew");
    userCrewQuery.find({
      success: function(result){
        console.log('this is successful', result)
        for (var i = 0; i < result.length; i++) {
          var userObj = result[i];
          var relation = userObj.relation("crew");
          relation.query().find({
            success: function(crew){
              var crewMember = crew.map(function(member){
                React.createElement(CrewMemberComponent, {key: member.id, member: member})
              })
            },
            error: function(error){
              console.log(error);
            }
          });
        }
      },
      error: function(error){
        console.log(error);
      }

    });

  },
  handleSendInvite: function(e){
    e.preventDefault();

    var email = $('#email').val();
    if (email == ""){
      console.log('error')
    } else {
      var Info = Parse.Object.extend("Invites");
      var invite_info = new Info();
      invite_info.set({
        'Recipient': email,
        'Sender': Parse.User.current(),
        'Message': "Please accept my invitation to join my crew!"
      });
      invite_info.save(null, {
        success: function(info) {
              console.log('New object created with objectId: ' + info.id);
          },
        error: function(info, error) {
          console.log('Failed to create new object, with error code: ' + error.message);
          }
      });
    }
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
            crewMember
          ), 


          React.createElement("form", {id: "form-body", className: "col s12"}, 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("input", {id: "email", type: "email", className: "validate"}), 
                React.createElement("label", {htmlFor: "email", "data-error": "Please enter a valid email address", "data-success": "Correct"}, "Email")
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
          React.createElement("div", {className: "flow-text"}, 
            React.createElement("i", {className: "large material-icons"}, "perm_identity")
          ), 
          React.createElement("div", null, 
            this.props.member.get("first_name") + " " + this.props.member.get("last_name")
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