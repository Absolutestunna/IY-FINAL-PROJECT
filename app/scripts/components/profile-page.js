var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');
var createFragment = require('react-addons-create-fragment');

var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()
        , PNF = require('google-libphonenumber').PhoneNumberFormat
        , PNT = require('google-libphonenumber').PhoneNumberType;

console.log(phoneUtil);

var ProfilePageComponent = React.createClass({displayName: "ProfilePageComponent",
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    return {
      file: "",
      profilePic: null,
      tel: ""
    }
  },
  componentDidMount: function(){
    $(".editSlider").hide();
    var profile_pic = Parse.User.current().get('profilePics').toJSON().url;
    var tel = Parse.User.current().get('Phone');
    this.setState({
      profilePic: profile_pic,
      tel: tel
    });

  },
  handlePublicGames: function(e){
    e.preventDefault();
    Backbone.history.navigate("games", {trigger: true});
  },
  handleCrewPage: function(e){
    e.preventDefault();
    Backbone.history.navigate("crew", {trigger: true});

  },
  handleGetMessage: function(e){
    e.preventDefault();
    Backbone.history.navigate("message", {trigger: true});

  },
  handleLogout: function(e){
    console.log('logout');
    e.preventDefault();
    Parse.User.logOut();
    Backbone.history.navigate('', {trigger: true})
  },
  handleUploadProfilePic: function(e){
    var file = e.target.files[0];
    this.setState({'profilePics': file});
    console.log('file', file);
    var name = file.name;
    var parseFile = new Parse.File(name, file);
    var self = this;
    parseFile.save().then(function(result) {
      // The file has been saved to Parse.
      console.log('result is: ', result);
      var user = Parse.User.current();
      user.set('profilePics', result);
      user.save();
      // location.reload();
      self.forceUpdate();  //attempt to rerender page after pic uploaded.


    }, function(error) {
      // The file either could not be read, or could not be saved to Parse.
      console.log(error);
    });

  },
  handlePhoneNumberCapture: function(e){
    console.log(e.target.value);
    var telCapture = e.target.value;
    var phoneNumber = phoneUtil.parse(telCapture, 'US');
    var tel = phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);
    this.setState({tel: tel});
    console.log('tel is: ',tel);
  },
  handleUpdatePhoneNumber: function(){
    var user = Parse.User.current();
    console.log(this.state.tel);
    user.set('Phone', this.state.tel);
    user.save();
  },
  handleSlider: function(e){
    e.preventDefault();
    $(".editSlider").slideToggle(500);
  },

  handleShow: function(){
    $('.edit-button').show();

  },
  render: function(){
    var user = Parse.User.current().getUsername();
    var telNum = Parse.User.current().get('Phone');

     return (
      React.createElement("div", {className: "row profile-page"}, 
        React.createElement("div", {className: "col m12 right-align"}, 
            React.createElement("a", {className: "sign-out"}, React.createElement("i", {onClick: this.handleLogout, className: "medium material-icons "}, "clear"))
        ), 


        React.createElement("div", {className: "col m12 center-align"}, 
          React.createElement("div", {className: "profile-info"}, 
            React.createElement("div", {onClick: this.handleShow, className: "profilePic"}, 
              React.createElement("img", {id: "profilePic", src: this.state.profilePic, alt: "profile-pic"})
            ), 
          React.createElement("a", {onClick: this.handleSlider, className: "edit-button btn-floating btn-tiny waves-effect waves-light grey darken-1"}, React.createElement("i", {className: "material-icons"}, "mode_edit")), 

            React.createElement("h3", {id: "user"}, user), 
            React.createElement("h5", {id: "tel"}, this.state.tel)
          ), 

          React.createElement("form", {action: "#", className: "editSlider", id: "fileupload", encType: "multipart/form-data", method: "post"}, 
           React.createElement("div", {className: "file-field input-field"}, 
             React.createElement("div", {className: "btn"}, 
               React.createElement("span", null, "File"), 
               React.createElement("input", {onChange: this.handleUploadProfilePic, type: "file"})
             ), 
             React.createElement("div", {className: "file-path-wrapper"}, 
               React.createElement("input", {className: "file-path validate", type: "text"})
             )
           ), 

           React.createElement("div", {className: "input-field col m12 s6 left-align"}, 
             React.createElement("div", {className: "row"}, 
               React.createElement("div", {className: "col m10"}, 
                 React.createElement("i", {className: "material-icons prefix"}, "phone"), 
                 React.createElement("input", {onChange: this.handlePhoneNumberCapture, id: "icon_telephone", type: "tel", className: "validate"}), 
                 React.createElement("label", {htmlFor: "icon_telephone"}, "Telephone")
               ), 
               React.createElement("div", {className: "col m2"}, 
                 React.createElement("input", {onClick: this.handleUpdatePhoneNumber, type: "submit", className: "btn"})
               )
             )

           )

          ), 

          React.createElement("div", {className: "gcm col m12"}, 
            React.createElement("button", {onClick: this.handlePublicGames, className: "btn btn-default center-align grey darken-1"}, 
              React.createElement("i", {className: "fa fa-futbol-o", "aria-hidden": "true"}), 
                "Games"
              ), 
            React.createElement("button", {onClick: this.handleCrewPage, className: "btn btn-default center-align grey darken-1"}, 
              React.createElement("i", {className: "fa fa-users", "aria-hidden": "true"}), 
                "Crew"
              ), 
            React.createElement("button", {onClick: this.handleGetMessage, className: "btn btn-default center-align grey darken-1"}, 
              React.createElement("i", {className: "medium material-icons"}, "message"), "Invitations"
            )
          )
        )



      )
    );
  }
});

module.exports = ProfilePageComponent;