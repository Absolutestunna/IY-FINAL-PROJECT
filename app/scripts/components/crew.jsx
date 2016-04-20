var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var CrewComponent = React.createClass({
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
  },
  handleLogout: function(e){
    e.preventDefault();
    Parse.User.logOut();
    Backbone.history.navigate('', {trigger: true})
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
    var crewMember = this.state.crewMembers.map(function(member){
      return (<CrewMemberComponent
        key={member.id}
        member={member}
        />
      );
    });
    return (
        <div className="row crew-container">
          <div className="col m12">
            <div className="row">
              <div className="col m11 center-align crew-title">
                <h4>MY CREW</h4>
              </div>
              <div className="col m1 right-align">
                <a className="crew-sign-out">
                  <i onClick={this.handleLogout} className="fa fa-sign-out fa-3x" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col m12 crew-pics">
            <div className="row">
              {crewMember}
              <div className="col m3 center-align add-crew">
                <a onClick={this.handleSlider} className="btn-large waves-effect waves-light">
                  <i className="large material-icons">perm_identity</i>
                </a>
                <p>Send Invite</p>
              </div>
            </div>
          </div>
          <div className="col m12 center-align createMatch">
            <button onClick={this.handleCreateMatch} className="btn-large waves-effect waves-light light-green accent-3">Create Match</button>
          </div>

          <form onSubmit={this.handleSendInvite} id="form-body" className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" className="validate" />
                <label htmlFor="email" data-error="Please enter a valid email address" data-success="Correct">Email</label>
              </div>
              <div className="input-field col s12 center-align ">
                <button type="submit" className="btn-large waves-effect waves-light light-green accent-3">Send Invite</button>
              </div>
            </div>
          </form>

      </div>
    );
  }
});

var CrewMemberComponent = React.createClass({
  render: function(){
    var crewMember = this.props.member;
    return (
        <div className="col m3 center-align eachMember">
          <div className="card">
            <div className="card-header">
              <img src={crewMember.get('profilePics')._url} alt="profile pic"/>
            </div>
          </div>
          <div className="crew-info center-align">
            <span>{crewMember.get("username")}</span>
          </div>
        </div>
    );
  }
});

module.exports = CrewComponent;
