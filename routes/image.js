var express = require('express')
  , router = express.Router()
  , fs = require('fs')
  , Image = require('../models/image');


router.get('/', function (req, res, next) {
  var v = Image.getImageList() || {};

  res.render('image/index', {
    curNav: 'image',
    basePath: req.url + 'ls',
    prevPath: '/',
    list: v,
    pageTitle: '图片'
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
    prevPath = '/image/ls/' + fids.slice(0, fids.length - 1).join('/');
  }

  var v = Image.getImageList(fids) || {};

  if (typeof v['type'] === 'undefined') {
    res.render('image/index', {
      curNav: 'image',
      prevPath: prevPath,
      basePath: req.url,
      list: v,
      pageTitle: '图片列表'
    });
  } else {
    var imageSrc = fids.join('/');
    res.render('image/image', {
      curNav: 'image',
      imageSrc: imageSrc,
      imageName: v.filename,
      pageTitle: v.filename
    });
  }
});

router.get('/r/*?', function (req, res, next) {
  var fids = req.url.split('/').slice(2);

  var v = Image.getImageList(fids);

  if (typeof v['path'] !== 'undefined') {
    res.sendFile(v['path']);
  } else {
    res.json({"code": 1, "msg": 'file not found!'});
  }
});

module.exports = router;
