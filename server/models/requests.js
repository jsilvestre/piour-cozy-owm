// Generated by CoffeeScript 1.4.0
var americano;

americano = require('americano-cozy');

module.exports = {
  city: {
    all: function(doc) {
      return emit(Date.parse(doc.created), doc);
    }
  }
};