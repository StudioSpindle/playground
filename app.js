const express = require('express');
const app = express();
const path = require('path');
 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));

/**
 * JSDoc pages
 * TODO: Refactor to a more scalable setup, where generated pages are automatically available
 */

app.get('/out/index.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/out/index.html'));
});

app.get('/out/global.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/out/global.html'));
});

app.get('/out/index.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/out/index.js.html'));
});

app.get('/out/index.js.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/out/index.js.html'));
});

app.use('/out/fonts', express.static(path.join(__dirname, '/out/fonts')));
app.use('/out/scripts', express.static(path.join(__dirname, '/out/scripts')));
app.use('/out/styles', express.static(path.join(__dirname, '/out/styles')));

app.listen(3000, function() {
  console.log('App is listening on port 3000. Open http://localhost:3000.')
});
