// cache singleton object
var _ = require('lodash');

function Cache() {

  instance = this;

  this.cache = {};

  Cache = function () {
    return instance;
  }
};

Cache.prototype.get = function (key) {
  return typeof key === 'undefined' ? this.cache : this.cache[key];
};

Cache.prototype.put = function (key, val) {
  if (typeof key !== 'undefined') {
    this.cache[key] = val;
  }
  return this;
};

Cache.prototype.isExists = function (key) {
  return typeof this.cache[key] !== 'undefined';
};

Cache.prototype.clear = function (key) {
  if (typeof key === 'undefined') this.cache = {};
  else delete this.cache[key];
  return this;
};

const CACHE = '../cache/cache.json';

Cache.prototype.save = function () {
  fs.writeFileSync(CACHE, JSON.stringify(this.cache, null, 2));
};

Cache.prototype.read = function () {
  try {
    this.cache = JSON.parse(fs.readFileSync(CACHE));
  } catch(e) {
    console.log(e);
  }
};

module.exports = function () {
  var instance;

  return (function () {
    if (!instance) {
      instance = new Cache();
    }
    return instance;
  })();
};
