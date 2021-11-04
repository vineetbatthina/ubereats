var aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const bucketName = "ubereatsdb";

aws.config.update({
  accessKeyId: 'AKIA6BS2OQIWUPIG3B27',
  secretAccessKey: '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',
  region: 'us-east-2',
});

var upload = multer({
    storage: multerS3({
      s3: new aws.S3(),
      bucket: bucketName,
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: 'testing'});
      },
      key: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        const imagePath = req.params.entity + "/" + Date.now().toString() + "." + ext;
        cb(null, imagePath);
      }
    })
  })
  
exports.upload = upload;