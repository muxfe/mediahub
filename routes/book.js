var express = require('express')
  , router = express.Router()
  , fs = require('fs')
  , Book = require('../models/book');

var key = 'book';

router.get('/', function (req, res) {

  var v = Book.getBookList() || {};

  res.render('book/index', {
    curNav: 'book',
    basePath: req.url + 'ls',
    prevPath: '/',
    bookList: v,
    pageTitle: '小说'
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
    prevPath = '/book/ls/' + fids.slice(0, fids.length - 1).join('/');
  }

  var v = Book.getBookList(fids) || {};

  if (typeof v['type'] === 'undefined') {
    res.render('book/index', {
      curNav: 'book',
      prevPath: prevPath,
      basePath: req.url,
      bookList: v,
      pageTitle: '小说列表'
    });
  } else {
    var bookContent = '', bookTitle = v.filename;
    try {
      bookContent = fs.readFileSync(v.path).toString();
    } catch(err) {
      console.log(err);
    }
    res.render('book/book', {
      curNav: 'book',
      bookContent: bookContent,
      bookTitle: bookTitle,
      pageTitle: bookTitle
    });
  }
});

module.exports = router;
