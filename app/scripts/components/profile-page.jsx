var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');
var createFragment = require('react-addons-create-fragment');


var ProfilePageComponent = React.createClass({
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
      <div className="row profile-page">
        <div className='col m12 right-align'>
            <i onClick={this.handleLogout} className="medium material-icons ">perm_identity</i>
        </div>


        <div className="col m6">
          <form action="#" id="fileupload" encType="multipart/form-data" method="post">
           <div className="file-field input-field">
             <div className="btn">
               <span>File</span>
               <input onChange={this.handleUploadProfilePic} type="file" />
             </div>
             <div className="file-path-wrapper">
               <input className="file-path validate" type="text" />
             </div>
           </div>
          </form>
          <p>{user}</p>
        </div>

        <div className="col m6">
          <button onClick={this.handlePublicGames} className="btn btn-default center-align">Games</button>
          <button onClick={this.handleCrewPage} className="btn btn-default center-align">Crew</button>
          <button onClick={this.handleGetMessage} className="btn btn-default center-align">
            <i className="medium material-icons">message</i>
          </button>
        </div>

      </div>
    );
  }
});

module.exports = ProfilePageComponent;
