var _ = require('lodash')
  , List = require('../util/list')
  , Cache = require('../util/cache')();

function Model() {}

Model.prototype.getList = function (fids, type) {
  fids = fids || [];

  var rootcache = {};
  try {
    rootcache = Cache.get();
    if (Object.keys(rootcache) < 1) {
      rootcache = List.lsroot();
    }
  } catch(e) {
    console.log(e);
  }

  // if no fids, return root directory
  if (!fids || fids.length < 1) {
    return filter(rootcache, type);
  }

  var retval = rootcache;

  _.each(fids, function (fid) {
    try {
      if (typeof retval[fid] === 'undefined') return;
      if (typeof retval[fid].children === 'undefined') {
        retval[fid].children = List.ls(retval[fid].path);
      }
      retval = retval[fid].children;
    } catch(e) {
      if (e.code === 'ENOTDIR') { // not a directory, return media file
        retval = retval[fid];
      } else {
        console.log(e);
      }
    }
  });

  if (typeof retval['type'] === 'undefined') {
    return filter(retval, type);
  } else {
    return retval;
  }
}

function filter(o, mtype) {
  if (!o || typeof o !== 'object') return o;
  if (!mtype || typeof mtype !== 'string') return o;

  var retval = {};
  _.each(o, function(value, key) {
    if (typeof value['type'] === 'undefined') return;
    var type = value.type;
    if (type === mtype || type === 'dir') {
      retval[key] = value;
    }
  });
  return retval;
}

module.exports = new Model();
