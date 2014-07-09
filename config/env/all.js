var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
  port: process.env.PORT || 3000,
  mongo: {},
};