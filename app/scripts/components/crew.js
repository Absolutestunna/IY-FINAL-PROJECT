var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var CrewComponent = React.createClass({displayName: "CrewComponent",
  mixins: [Backbone.React.Component.mixin],

  getInitialState: function(){
    return {
      crewMembers: []
    }
  },
  handleSlider: function(e){
    e.preventDefault();
    $("#form-body").slideToggle(500);
  },
  handleCreateMatch: function(e){
    e.preventDefault();
    Backbone.history.navigate('createMatch', {trigger: true});
  },
  componentWillMount: function(){
    var userID = Parse.User.current().id;
    var userCrewQuery = new Parse.Query(Parse.User);
    userCrewQuery.equalTo("objectId", userID);
    userCrewQuery.include("crew");
    var self = this;
    userCrewQuery.find({
      success: function(result){
        console.log('this is successful', result)
        for (var i = 0; i < result.length; i++) {
          var userObj = result[i];
          var relation = userObj.relation("crew");
          relation.query().find({
            success: function(crew){
      

              self.setState({
                crewMembers: crew
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
      alert('error, append this message to the screen')
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
    console.log('crewMembers are: ', this.state.crewMembers);
    var crewMember = this.state.crewMembers.map(function(member){
      console.log('member is: ', member);
      return (React.createElement(CrewMemberComponent, {
        key: member.id, 
        member: member}
        ));
    });
    return (
        React.createElement("div", {className: "row crew-container"}, 
          React.createElement("div", {className: "col m12"}, 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col m8"}, 
                React.createElement("h4", null, "MY CREW")
              ), 
              React.createElement("div", {className: "col m4 right-align add-crew"}, 
                React.createElement("button", {onClick: this.handleSlider, className: "btn-floating btn-large waves-effect waves-light red"}, React.createElement("i", {className: "material-icons"}, "add"))
              )
            )
          ), 
          React.createElement("div", {className: "col m12 crew-pics"}, 
            crewMember
          ), 
          React.createElement("div", {className: "col m12 center-align"}, 
            React.createElement("button", {onClick: this.handleCreateMatch, className: "btn-large waves-effect waves-light"}, "Create Match")
          ), 


          React.createElement("form", {onSubmit: this.handleSendInvite, id: "form-body", className: "col s12"}, 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("input", {id: "email", type: "email", className: "validate"}), 
                React.createElement("label", {htmlFor: "email", "data-error": "Please enter a valid email address", "data-success": "Correct"}, "Email")
              ), 
              React.createElement("div", {className: "input-field col s12"}, 
                React.createElement("button", {type: "submit", className: "btn-large waves-effect waves-light"}, "Send Invite")
              )
            )
          )

      )
    );
  }
});

var CrewMemberComponent = React.createClass({displayName: "CrewMemberComponent",
  mixins: [Backbone.React.Component.mixin],

  render: function(){
    console.log('props member is: ', this.props.member);
    return (
      React.createElement("div", {className: "row eachMember"}, 
        React.createElement("div", {className: "col m2"}, 
          React.createElement("div", {className: "flow-text"}, 
            React.createElement("i", {className: "large material-icons"}, "perm_identity")
          ), 
          React.createElement("div", {className: "center-align"}, 
            React.createElement("div", null, this.props.member.get("first_name")), 
            React.createElement("div", null, this.props.member.get("last_name"))
          )
        )
      )
    );
  }
});

module.exports = CrewComponent;