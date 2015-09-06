var express = require('express');
var render = require('./lib/render');
var config = require('./config.json');
var app = express();

var DATA_REFRESH_INTERVAL_IN_SECONDS = 60;

render();

setInterval(function () {
  render();
}, DATA_REFRESH_INTERVAL_IN_SECONDS * 1000);

app.use('/', express.static('public'));

var server = app.listen(config.port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Analytics dashboard listening at http://%s:%s', host, port);
});
