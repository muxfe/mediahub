var express = require('express')
  , router = express.Router()
  , Video = require('../models/video');

router.get('/', function (req, res, next) {
  var v = Video.getVideoList() || {};

  res.render('video/index', {
    curNav: 'video',
    basePath: req.url + 'ls',
    prevPath: '/',
    videoList: v,
    pageTitle: '视频列表'
  });
});

router.get(['/ls','/ls/*?'], function (req, res) {
  var fids = [];
  var prevPath = '/';
  try {
     fids = req.url.split('/').slice(2);
  } catch(err) {
    console.log(err);
  }
  if (fids && fids.length > 0 && fids[0]) {
    prevPath = '/video/ls/' + fids.slice(0, fids.length - 1).join('/');
  }

  var v = Video.getVideoList(fids) || {};

  if (typeof v['type'] === 'undefined') {
    res.render('video/index', {
      curNav: 'video',
      prevPath: prevPath,
      basePath: req.url,
      videoList: v,
      pageTitle: '视频列表'
    });
  } else {
    var videoSrc = fids.join('/');
    res.render('video/video', {
      curNav: 'video',
      videoSrc: videoSrc,
      videoName: v.filename,
      pageTitle: v.filename
    });
  }
});

router.get('/r/*?', function (req, res, next) {
  var fids = req.url.split('/').slice(2);

  var v = Video.getVideoList(fids);

  if (typeof v['path'] !== 'undefined') {
    res.sendFile(v['path']);
  } else {
    res.json({"code": 1, "msg": 'file not found!'});
  }
});

module.exports = router;
