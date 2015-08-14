var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var config = require('../config.json');
var request = require('request');
var express = require('express');
var cors = require('cors');
var fs = require('fs');

var requestSettingsTripUpdates = {
  method: 'GET',
  url: config['gtfs-urls']['trip-updates'],
  encoding: null
};
var requestSettingsServiceAlerts = {
  method: 'GET',
  url: config['gtfs-urls']['service-alerts'],
  encoding: null
};

module.exports = {
  getTripUpdates: function (callback) {
    request(requestSettingsTripUpdates, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
        callback(null, feed);
      }
      else {
        callback(error);
      }
    });
  },
  getServiceAlerts: function (callback) {
    request(requestSettingsServiceAlerts, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
        callback(null, feed);
      }
      else {
        callback(error);
      }
    });
  }
};
