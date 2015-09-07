'use strict';

var jade = require('jade');
var fs = require('fs');
var path = require('path');
var data = require('./data');

var TOTAL_TRAINS = 3670;
var JADE_TEMPLATE_PATH = path.join(process.cwd(), 'views/index.jade');
var OUTPUT_HTML_PATH = path.join(process.cwd(), 'public/index.html');

module.exports = function () {
  data.getServiceAlerts(function (err, serviceAlerts) {
    data.getTripUpdates(function (err, tripUpdates) {
      fs.readFile(JADE_TEMPLATE_PATH, 'utf8', function (err, data) {
        if (err) throw err;

        var template = jade.compile(data);
        var html = template({
          serviceAlerts: serviceAlerts.entity,
          tripUpdates: tripUpdates.entity.map(function (tripUpdate) {
            // var totalDelayInSeconds = tripUpdate.trip_update.stop_time_update.reduce(function (total, stopTimeUpdate) {
            //   return total + stopTimeUpdate.arrival.delay;
            // }, 0);

            // tripUpdate.totalDelay = totalDelayInSeconds === 0 ? 'cancelled' : Math.round(totalDelayInSeconds / 60);
            var maxDelayInSeconds = tripUpdate.trip_update.delay;
            tripUpdate.maxDelay = Math.round(maxDelayInSeconds / 60);
            tripUpdate.trainNumber = tripUpdate.trip_update.trip.route_id.split(':')[1];

            return tripUpdate;
          }),
          trainsWithIssues: tripUpdates.entity.length,
          percentageOfDelays: (tripUpdates.entity.length / TOTAL_TRAINS * 100).toFixed(2)
        });

        fs.writeFile(OUTPUT_HTML_PATH, html);
      });
    });
  });
};


