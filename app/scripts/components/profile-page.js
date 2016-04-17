var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');
var createFragment = require('react-addons-create-fragment');
var phoneUtil = require('google-libphonenumber').PhoneUtil;
        // , PNF = require('google-libphonenumber').PhoneNumberFormat
        // , PNT = require('google-libphonenumber').PhoneNumberType;

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
    var profile_pic = Parse.User.current().get('profilePics').toJSON().url;
    this.setState({profilePic: profile_pic});
    // var userID = Parse.User.current().id
    // var userPicQuery = new Parse.Query(Parse.User);
    // // userPicQuery.equalTo("objectId", );  // find all the women
    // userPicQuery.find({
    //   success: function(result) {
    //     // Do stuff
    //     console.log(result);
    //   }
    // });
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

    //
    // var profile_pic = Parse.User.current().get('profilePics').toJSON().url;
    // this.pic = profile_pic;
    // this.setState({profilePic: profile_pic});
  },
  handlePhoneNumberCapture: function(e){
    console.log(e.target.value);
    var telCapture = e.target.value;
    var tel = phoneUtil.parse(telCapture, 'US');
    console.log(tel);
  },
  handleUpdatePhoneNumber: function(){
    var user = Parse.User.current();
    user.set('phone', this.state.tel);
    user.save();
  },
  render: function(){
    var user = Parse.User.current().getUsername();

     return (
      React.createElement("div", {className: "row profile-page"}, 
        React.createElement("div", {className: "col m12 right-align"}, 
            React.createElement("i", {onClick: this.handleLogout, className: "medium material-icons "}, "perm_identity")
        ), 


        React.createElement("div", {className: "col m6 center-align"}, 
        React.createElement("img", {id: "profilePic", src: this.state.profilePic, alt: "profile-pic"}), 
          React.createElement("form", {action: "#", id: "fileupload", encType: "multipart/form-data", method: "post"}, 
           React.createElement("div", {className: "file-field input-field"}, 
             React.createElement("div", {className: "btn"}, 
               React.createElement("span", null, "File"), 
               React.createElement("input", {onChange: this.handleUploadProfilePic, type: "file"})
             ), 
             React.createElement("div", {className: "file-path-wrapper"}, 
               React.createElement("input", {className: "file-path validate", type: "text"})
             )
           )
          ), 
          React.createElement("p", null, user), 


          React.createElement("div", {className: "input-field col s6 left-align"}, 
            React.createElement("i", {className: "material-icons prefix"}, "phone"), 
            React.createElement("input", {onChange: this.handlePhoneNumberCapture, id: "icon_telephone", type: "tel", className: "validate"}), 
            React.createElement("label", {htmlFor: "icon_telephone"}, "Telephone"), 
            React.createElement("input", {type: "submit", className: "btn"})
          )




        ), 

        React.createElement("div", {className: "col m6"}, 
          React.createElement("button", {onClick: this.handlePublicGames, className: "btn btn-default center-align"}, "Games"), 
          React.createElement("button", {onClick: this.handleCrewPage, className: "btn btn-default center-align"}, "Crew"), 
          React.createElement("button", {onClick: this.handleGetMessage, className: "btn btn-default center-align"}, 
            React.createElement("i", {className: "medium material-icons"}, "message")
          )
        )

      )
    );
  }
});

module.exports = ProfilePageComponent;