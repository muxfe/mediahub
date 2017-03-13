var Model = require('./model');;

function Image() {};

Image.prototype.getImageList = function(fids) {
  return Model.getList(fids, 'image');
};

module.exports = new Image();
