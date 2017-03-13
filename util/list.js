// like ls command in shell

var _ = require('lodash')
  , fs = require('fs')
  , _path = require('path')
  , shortid = require('shortid')
  , Cache = require('./cache')();

const imageRegex = /(.png|.jpg|.jpeg|.bmp|.gif)$/
  , filmRegex = /(.mp4|.mkv|.avi|.rmvb|.flv|.3gp)$/
  , textRegex = /(.txt)$/;

const CONFIG = './config.json';

function List() {

}

List.prototype.ls = ls;

List.prototype.lsroot = function () {
  var paths = [];
  try {
    paths = JSON.parse(fs.readFileSync(CONFIG))['resources'];
  } catch (e) {
    return console.log(e);
  }

  _.each(paths, function (value) {
    var o = ls(value);
    _.each(o, function (val, key) {
      Cache.put(key, val);
    });
  });

  return Cache.get();
};

List.prototype.type = type;

List.prototype.getFid = getFid;

function ls(path) {
  var fileList = fs.readdirSync(path);
  var retval = {};

  _.each(fileList, function (value, key) {
    var fid = getFid();
    var absFilePath = _path.join(path, value);
    var stat = fs.statSync(absFilePath);

    var item = {
      path: absFilePath,
      filename: value
    };

    if (stat.isDirectory()) {
      item.type = 'dir';
      item.total = getDirLen(absFilePath);
    } else {
      item.type = type(value);
    }

    retval[fid] = item;
  });

  return retval;
}

function type(filename) {
  if (imageRegex.test(filename)) return 'image';
  if (filmRegex.test(filename)) return 'film';
  if (textRegex.test(filename)) return 'text';
  return 'file';
}

function getDirLen(path) {
  return fs.readdirSync(path).length;
}

function getFid() {
  return shortid.generate();
}

module.exports = new List();
