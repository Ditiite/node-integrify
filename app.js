const http = require('http');  // How we require modules
const fs = require('fs');
const os = require('os');
const { displayDateTime } = require('./displayDateTime');
const port = 3000;
const hostname = '127.0.0.1';

const students = [
    {
        name: 'Susansa',
        gender: 'female',
        country: 'Finland'
    },
    {
        name: 'Jaya',
        gender: 'Male',
        country: 'Finland'
    }
    , {
        name: 'Shora',
        gender: 'male',
        country: 'Finland'
    }
]

http.createServer((req, res) => {
    let page = '';

    //Icon for application requested automatically by browser
    if (req.url === '/favicon.ico') {
        res.end();
        // Do not track
        return;
    } else if (req.url === '/' || req.url === "/home") {
        page = 'home';
        fs.readFile('index.html', (err, data) => {
            if (err) {
                return console.log(err)
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    else if (req.url === '/about') {
        page = 'about';
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('This is the about page');
        res.end();
    }
    else if (req.url === '/contact') {
        page = 'contact';
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(students));
        res.end();
    }

    const username = os.hostname();
    const ip = os.networkInterfaces().en0[1].address;
    const pageUrl = req.url;
    const checkingTime = displayDateTime();
    const tracking = `User: ${username} ip: ${ip} checking time: ${checkingTime} check page: ${page}\n`;

    fs.appendFile('track.user.activity.txt', tracking, (e) => {
        if (e) {
            console.log(e)
        }
        console.log('content saved')
    });

}).listen(port, hostname, () => {
    console.log(`Server is running on ${port}...`)
});