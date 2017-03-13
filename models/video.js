var Model = require('./model');

function Video() {}

Video.prototype.getVideoList = function (fids) {
  return Model.getList(fids, 'film');
};

module.exports = new Video();
