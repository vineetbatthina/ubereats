const express = require('express');
const router = express.Router();
const { upload } = require('../services/fileUploadAWS');

router.post('/api/imageUpload/:entity', upload.single('image'), function (req, res, next) {
  console.log("Reached To Image Upload");
  res.send({ imageUrl: req.file.location });
});

module.exports = router;