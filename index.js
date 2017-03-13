var express = require('express')
  , jade = require('jade')
  , path = require('path');

var app = express();
var cache = {};

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "jade");

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

// routes
var index = require('./routes/index');
var video = require('./routes/video');
var book = require('./routes/book');
var image = require('./routes/image');
var file = require('./routes/file');

app.use('/', index);
app.use('/video', video);
app.use('/book', book);
app.use('/image', image);
app.use('/file', file);

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(app.get('port'));
console.log('mediahub server listen on port ' + app.get('port'));
