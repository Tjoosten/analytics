'use strict';

var data = require('./data');

module.exports = function () {
  data.getServiceAlerts(function (err, feed) {
    console.log(err, feed);
  });
};


