var Model = require('./model');

function Book() {};

Book.prototype.getBookList = function (fids) {
  return Model.getList(fids, 'text');
}

module.exports = new Book();
