const multer = require('multer');

const diskStorageToUploads = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/userExpenses');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const saveReciepts = multer({ storage: diskStorageToUploads });

module.exports = {
  saveReciepts: saveReciepts.array('file', 10),
};
