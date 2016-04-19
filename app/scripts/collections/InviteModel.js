var Backbone = require('backbone');



var GameInviteModel = Backbone.Model.extend({
  urlRoot: 'http://localhost:3000/sendSMS'     //'http://twilio-proxy-kickkit.herokuapp.com/sendSMS'
});
module.exports = GameInviteModel;
