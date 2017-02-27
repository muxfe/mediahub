var express = require('express');
var jade = require('jade');
var app = express();

var Video = require('./app/video');
var Img = require('./app/image');

var cache = {};

app.set("views", "./views");

app.set("view engine", "jade");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public/'));

app.get('/video', function (req, res, next) {
  var key = 'video';
  var v = {};
  if (isCached(key)) {
    v = getCache(key);
  } else {
    v = Video.getVideoList();
    putCache(key, v);
  }

  res.render('video/index', {
    videoList: v,
    pageTitle: '视频列表'
  });
});

app.get('/video/:name', function (req, res, next) {
  var name = req.params.name;
  var key = 'video';
  var v = {};
  if (isCached(key)) {
    v = getCache(key);
  } else {
    v = Video.getVideoList();
    putCache(key, v);
  }

  if (typeof v[name] !== 'undefined') {
    res.render('video/video', {
      videoName: name,
      pageTitle: name
    });
  } else {
    res.render('error', {
      "code": 1,
      "msg": 'file not found!'
    });
  }
});

app.get('/r/video/:name', function (req, res, next) {
  var name = req.params.name;
  var key = 'video';
  var v = {};
  if (isCached(key)) {
    v = getCache(key);
  } else {
    v = Video.getVideoList();
    putCache(key, v);
  }
  if (typeof v[name] !== 'undefined') {
    res.sendFile(v[name], function (err) {
      // if (err) {
      //   console.log(err);
      // }
    });
  } else {
    res.json({"code": 1, "msg": 'file not found!'});
  }
});

app.get('/image', function (req, res, next) {
  var key = 'image';
  var v = {};
  if (isCached(key)) {
    v = getCache(key);
  } else {
    v = Img.getImageList();
    putCache(key, v);
  }

  res.render('image/index', {
    imageList: v,
    pageTitle: '相册'
  });
});

app.get('/r/image/:name', function (req, res, next) {
  var name = req.params.name;
  var key = 'image';
  var v = {};
  if (isCached(key)) {
    v = getCache(key);
  } else {
    v = Img.getImageList();
    putCache(key, v);
  }
  if (typeof v[name] !== 'undefined') {
    res.sendFile(v[name], function (err) {
      // if (err) {
      //   console.log(err);
      // }
    });
  } else {
    res.json({"code": 1, "msg": 'file not found!'});
  }
});

function isCached(key) {
  return typeof cache[key] !== 'undefined';
}

function putCache(key, val) {
  cache[key] = val;
}

function getCache(key) {
  return isCached(key) ? cache[key] : null;
}

app.listen(app.get('port'));
console.log('mediahub server listen on port ' + app.get('port'));
