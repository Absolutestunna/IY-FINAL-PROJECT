var Backbone = require('backbone');
var $ = require('jquery');


var PublicMatch = Backbone.Model.extend({});

var PublicMatchesCollection = Backbone.Collection.extend({
  model: PublicMatch
});

module.exports = PublicMatchesCollection;
