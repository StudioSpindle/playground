var express = require('express');
var app = express();
var path = require('path');
 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/js', express.static(path.join(__dirname, 'js')))

app.listen(3000, function() {
  console.log('App is listening on port 3000. Open http://localhost:3000.')
});
