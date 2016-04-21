var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');
var createFragment = require('react-addons-create-fragment');

var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance(),
         PNF = require('google-libphonenumber').PhoneNumberFormat,
         PNT = require('google-libphonenumber').PhoneNumberType;


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
    if (!Parse.User.current()){
      Backbone.history.navigate('', {trigger: true});
    }
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
    var name = file.name;
    var parseFile = new Parse.File(name, file);
    var self = this;
    parseFile.save().then(function(result) {
      // The file has been saved to Parse.
      self.setState({profilePic: result._url});
      var user = Parse.User.current();
      user.set('profilePics', result);
      user.save();
      $('#profile-pic-file').val(" ");

    }, function(error) {
      // The file either could not be read, or could not be saved to Parse.
      console.log(error);
    });

  },
  handlePhoneNumberCapture: function(e){
    var telCapture = e.target.value;
    var phoneNumber = phoneUtil.parse(telCapture, 'US');
    var tel = phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);
    this.setState({tel: tel});
  },
  handleUpdatePhoneNumber: function(e){
    e.preventDefault();
    var user = Parse.User.current();
    console.log(this.state.tel);
    user.set('Phone', this.state.tel);
    user.save();
    $('#icon_telephone').val('');
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
        React.createElement("div", {className: "col m12 col s12 col xs12"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col xs8 col s8 col m8 col lg8 left-align"}, 
              React.createElement("img", {id: "profile-logo", src: "././images/Kikkitlogo.png"})
            ), 
            React.createElement("div", {className: "col xs4 col s4 col m4 col lg4 right-align"}, 
              React.createElement("a", {className: "sign-out"}, 
                React.createElement("i", {onClick: this.handleLogout, className: "fa fa-sign-out fa-3x", "aria-hidden": "true"})
              )
            )
          )

        ), 


        React.createElement("div", {className: "col m12 col s12 col xs12 center-align"}, 
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
               React.createElement("input", {id: "profile-pic-file", onChange: this.handleUploadProfilePic, type: "file"})
             ), 
             React.createElement("div", {className: "file-path-wrapper"}, 
               React.createElement("input", {id: "profile-pic-file", className: "file-path validate", type: "text"})
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
                 React.createElement("input", {onClick: this.handleUpdatePhoneNumber, type: "submit", className: "btn", defaultValue: "UPDATE"})
               )
             )

           )

          ), 

          React.createElement("div", {className: "gcm col m12 col s12 col xs12"}, 
            React.createElement("button", {onClick: this.handlePublicGames, className: "btn btn-default center-align"}, 
              React.createElement("i", {className: "fa fa-futbol-o", "aria-hidden": "true"}), 
                "FIND Games"
              ), 
            React.createElement("button", {onClick: this.handleCrewPage, className: "btn btn-default center-align"}, 
              React.createElement("i", {className: "fa fa-users", "aria-hidden": "true"}), 
                "Crew"
              ), 
            React.createElement("button", {onClick: this.handleGetMessage, className: "btn btn-default center-align"}, 
              React.createElement("i", {className: "medium material-icons"}, "message"), 
                "Invitations"
            )
          )
        )



      )
    );
  }
});

module.exports = ProfilePageComponent;