// Generated by CoffeeScript 1.4.0
var City;

City = require('../models/city');

module.exports.all = function(req, res) {
  return City.all(function(err, cities) {
    var msg;
    if (err) {
      msg = "Server error occured while retrieving data.";
      return res.send({
        error: true,
        msg: msg,
        err: err
      });
    } else {
      return res.send(cities);
    }
  });
};

module.exports.create = function(req, res) {
  var _this = this;
  return City.create(req.body, function(err, city) {
    var msg;
    if (err) {
      msg = "Server error while creating city.";
      return res.send({
        error: true,
        msg: msg
      }, 500);
    } else {
      return City.fullCity(city, function(err, city) {
        return res.send(city);
      });
    }
  });
};

module.exports.destroy = function(req, res) {
  var _this = this;
  return City.find(req.params.id, function(err, city) {
    if ((err != null) || !(city != null)) {
      return res.send({
        error: true,
        msg: "City not found"
      }, 404);
    } else {
      return city.destroy(function(err) {
        if (err) {
          res.send({
            error: 'Cannot delete city'
          }, 500);
        } else {
          res.send({
            success: 'City succesfuly deleted'
          });
        }
        return city = null;
      });
    }
  });
};
