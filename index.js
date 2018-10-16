const https = require('https');
var fs = require('fs');

const port = process.env.PORT || 44300;
const remotePort = process.env.REMOTE_PORT || process.env.PORT || 44300;
const remoteHost = process.env.REMOTE_HOST;

const requestHandler = (request, response) => {
  console.log("Requesting", request.url);

  var options = {
    host: remoteHost,
    port: remotePort,
    path: request.url,
    rejectUnauthorized: false
  };
  var request = https.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
      response.end(data);
    });
  });
  request.on('error', function (e) {
      response.end(e.message);
  });
  request.end();
}

var httpsOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

if (!remoteHost) {
  console.error("You must specify remote host");
  process.exit(1);
}

https
  .createServer(httpsOptions, requestHandler)
  .listen(port, (err) => {
    if (err) {
      return console.log('Error:', err)
    }

    console.log(`Proxy is listening on ${port}`)
  });