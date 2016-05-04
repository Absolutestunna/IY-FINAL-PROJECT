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
    if (!Parse.User.current()){
      Backbone.history.navigate('', {trigger: true});
    }
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
  componentDidMount: function(){
    $("#form-body").hide();
    $(".invite-info").hide();
  },
  handleLogout: function(e){
    Parse.User.logOut();
    Backbone.history.navigate('', {trigger: true});
    this.forceUpdate();
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
    $(".invite-info").show();
    $("#form-body").slideToggle(500);
    $('#email').val('');

    var timer = setTimeout(function(){
      $(".invite-info").hide();
      Backbone.history.navigate('profile', {trigger: true});
    }, 3000);

  },
  render: function(){
    var crewMember = this.state.crewMembers.map(function(member){
      return(
        React.createElement(CrewMemberComponent, {
          key: member.id, 
          member: member}
        )
      )
    });
    return (
        React.createElement("div", {className: "row crew-container"}, 
          React.createElement("div", {className: "col xs12 col s12 col l12 col m12"}, 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col xs9 col s9 col l11 col m11 center-align crew-title"}, 
                React.createElement("h4", null, "MY CREW")
              ), 
              React.createElement("div", {className: "col xs3 col s3 col l1 col m1 right-align"}, 
                React.createElement("a", {className: "crew-sign-out"}, 
                  React.createElement("i", {onClick: this.handleLogout, className: "fa fa-sign-out fa-3x", "aria-hidden": "true"})
                )
              )
            )
          ), 
          React.createElement("div", {className: "col xs12 col s12 col l12 col m12 crew-pics"}, 
            React.createElement("div", {className: "row"}, 
              crewMember, 
              React.createElement("div", {className: "col m4 col xs4 col s4 col l3 center-align add-crew"}, 
                React.createElement("a", {onClick: this.handleSlider, className: "btn-large waves-effect waves-light"}, 
                  React.createElement("i", {className: "large material-icons"}, "perm_identity")
                ), 
                React.createElement("p", null, "Send Invite")
              )
            )
          ), 
          React.createElement("div", {className: "col xs12 col s12 col l12 col m12 center-align createMatch"}, 
            React.createElement("button", {onClick: this.handleCreateMatch, className: "btn-large waves-effect waves-light light-green accent-3"}, "Create Match")
          ), 

          React.createElement("span", {className: "invite-info light-green-text"}, "Your invite has been successfully sent."), 

          React.createElement("form", {onSubmit: this.handleSendInvite, id: "form-body", className: "col s12"}, 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "input-field col xs12 col s12 col l12 col m12"}, 
                React.createElement("input", {id: "email", type: "email", className: "validate"}), 
                React.createElement("label", {htmlFor: "email", "data-error": "Please enter a valid email address"}, "Email")
              ), 
              React.createElement("div", {className: "input-field col xs12 col s12 col l12 col m12 center-align "}, 
                React.createElement("button", {type: "submit", className: "btn-large waves-effect waves-light light-green accent-3"}, "Send Invite")
              )
            )
          )

      )
    );
  }
});

var CrewMemberComponent = React.createClass({displayName: "CrewMemberComponent",
  render: function(){
    var crewMember = this.props.member;
    return (
        React.createElement("div", {className: "col m4 col xs4 col s4 center-align eachMember"}, 
          React.createElement("div", {className: "card"}, 
            React.createElement("div", {className: "card-header"}, 
              React.createElement("img", {src: crewMember.get('profilePics')._url, alt: "profile pic"})
            )
          ), 
          React.createElement("div", {className: "crew-info center-align"}, 
            React.createElement("span", null, crewMember.get("username"))
          )
        )
    );
  }
});

module.exports = CrewComponent;