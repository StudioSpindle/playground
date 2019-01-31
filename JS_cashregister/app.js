const express = require('express');
const app = express();
const path = require('path');
const appDir = path.dirname(require.main.filename);

require('./controller/routes.js')(app, path, appDir);

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/out/fonts', express.static(path.join(__dirname, '/out/fonts')));
app.use('/out/scripts', express.static(path.join(__dirname, '/out/scripts')));
app.use('/out/styles', express.static(path.join(__dirname, '/out/styles')));

app.listen(3000, function() {
  console.log('App is listening on port 3000. Open http://localhost:3000.')
});
