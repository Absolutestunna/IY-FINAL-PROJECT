var Backbone = require('backbone');



var GameInviteModel = Backbone.Model.extend({
  urlRoot: 'http://twilio-proxy-kickkit.herokuapp.com/sendSMS'
});
module.exports = GameInviteModel;
