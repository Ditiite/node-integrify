const http = require('http');  // How we require modules

http.createServer(function (req, res) {    ////  <=    THIS IS REQUEST
    res.writeHead(200);  // Status code in header
    res.write("Hello, this is dog.");  // Pesponse body
    setTimeout(function () {  // Represent long running process        ////  <=    THIS IS TIMEOUT
        res.write('Dog is not running anymore....');
        res.end();  // Close the connections on this port
    }, 5000);

}).listen(8080);  // Listen for connections on this port

console.log('Listening on port 8080...');