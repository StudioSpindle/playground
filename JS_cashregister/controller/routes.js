module.exports = function(app, path, appDir) {

    app.get('/', function (req, res) {
        res.sendFile(path.join(appDir + '/index.html'));
    });

    app.get('/:id', function (req, res) {
        res.sendFile(path.join(appDir + '/' + req.params.id));
    });

    app.get('/out/:id', function (req, res) {
        res.sendFile(path.join(appDir + '/out/' + req.params.id));
    });

};
