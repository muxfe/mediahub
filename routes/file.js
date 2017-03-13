var express = require('express')
  , router = express.Router()
  , Model = require('../models/model');

router.get('/', function (req, res, next) {
  var v = Model.getList() || {};

  res.render('file/index', {
    curNav: 'file',
    basePath: req.url + 'ls',
    prevPath: '/',
    list: v,
    pageTitle: '所有文件'
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
    prevPath = '/file/ls/' + fids.slice(0, fids.length - 1).join('/');
  }

  var v = Model.getList(fids) || {};

  if (typeof v['type'] === 'undefined') {
    res.render('file/index', {
      curNav: 'file',
      prevPath: prevPath,
      basePath: req.url,
      list: v,
      pageTitle: '文件列表'
    });
  } else {
    if (typeof v['path'] === 'undefined') {
      res.render('error', {
        message: 'file not found!'
      });
    } else {
      res.sendFile(v.path);
    }
  }
});

module.exports = router;
