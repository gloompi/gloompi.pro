const multer = require('koa-multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({storage: storage});
exports.init = app => app.use(upload.fields([{name: 'img', maxCount: 1}, {name: 'images', maxCount: 12}]));