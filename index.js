'use strict';

const AWS = require('aws-sdk');
var http = require("https");

exports.handler = (event, context, callback) => {

/**
  * Update these variables for the payload, host and path of your webhook.
  * The payload in this case is a JSON card object. For Microsoft Teams
  * reference this article for the options: 
  * https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/connectors#next-steps
**/

  var message = JSON.stringify(
            {
              "text": "Coffee is being made!"
            });
  var host = "{ADD HOST HERE}";
  var path = "{ADD PATH HERE}";

  var options = {
    "method": "POST",
    "hostname": host,
    "port": 443,
    headers: {
          "content-type": "application/json",
          'Content-Length': message.length
          },
    "path": path
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
    });
  });

  req.write(message);
  req.end();
};
