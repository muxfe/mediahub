var fs = require('fs');

var Video = {};

var config = JSON.parse(fs.readFileSync('config.js'));
var paths = config['video_path'];

Video.getVideoList = function () {
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
          paths.push(absFilePath);
        } else if (stat.isFile() && file.indexOf('.mp4') > -1) {
          v[file] = absFilePath;
        }
      });
    }
  }

  return v;
}

module.exports = Video;
