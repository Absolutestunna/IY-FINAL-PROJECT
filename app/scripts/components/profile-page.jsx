var React = require('react');
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

var ProfilePageComponent = React.createClass({
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
  render: function(){
    var user = Parse.User.current().getUsername();

     return (
      <div className="row profile-page">
        <div className='col m12 right-align'>
            <i onClick={this.handleLogout} className="medium material-icons ">perm_identity</i>
        </div>


        <div className="col m6 center-align">
        <img id="profilePic" src={this.state.profilePic} alt="profile-pic"/>
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


          <div className="input-field col s6 left-align">
            <i className="material-icons prefix">phone</i>
            <input onChange={this.handlePhoneNumberCapture} id="icon_telephone" type="tel" className="validate" />
            <label htmlFor="icon_telephone">Telephone</label>
            <input onClick={this.handleUpdatePhoneNumber} type="submit" className="btn"/>
          </div>




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
