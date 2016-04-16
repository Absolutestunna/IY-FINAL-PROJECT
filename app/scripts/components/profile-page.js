var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');
var createFragment = require('react-addons-create-fragment');


var ProfilePageComponent = React.createClass({displayName: "ProfilePageComponent",
  getInitialState: function(){
    return {
      file: ""
    }
  },
  mixins: [Backbone.React.Component.mixin],
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
    e.preventDefault();
    Parse.User.logOut();
    Backbone.history.navigate('', {trigger: true})
  },
  handleUploadProfilePic: function(e){
    var file = e.target.files[0];
    console.log('file', file);
    var name = file.name;
    var parseFile = new Parse.File(name, file);
    parseFile.save().then(function(result) {
      // The file has been saved to Parse.
      console.log('result is: ', result);
      var user = Parse.User.current();
      user.set('profilePics', result);
      user.save();


    }, function(error) {
      // The file either could not be read, or could not be saved to Parse.
      console.log(error);
    });

  },
  render: function(){
    var user = Parse.User.current().getUsername();

    return (
      React.createElement("div", {className: "row profile-page"}, 
        React.createElement("div", {className: "col m12 right-align"}, 
            React.createElement("i", {onClick: this.handleLogout, className: "medium material-icons "}, "perm_identity")
        ), 


        React.createElement("div", {className: "col m6"}, 
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
          React.createElement("p", null, user)
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