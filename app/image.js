var fs = require('fs');

var Img = {};

var config = JSON.parse(fs.readFileSync('config.js'));
var paths = config['image_path'];

Img.getImageList = function() {
  var v = {};

  while (paths.length > 0) {
    var path = paths.pop();
    traverseDir(path);
  }

  function traverseDir(path) {
    var fileList = fs.readdirSync(path);
    if (fileList.length > 0) {
      fileList.forEach(function (file) {
        var absFilePath = path + '/' + file;
        var stat = fs.statSync(absFilePath);
        // stat.size (byte)
        if (stat.isDirectory()) {
          paths.unshift(absFilePath);
        } else if (stat.isFile() && file.indexOf('.jpg') > -1) {
          v[file] = absFilePath;
        }
      });
    }
  }

  return v;
};

module.exports = Img;
