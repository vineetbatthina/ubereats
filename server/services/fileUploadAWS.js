var aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const bucketName = "ubereatsdb";

aws.config.update({
  accessKeyId: 'AKIA6BS2OQIWYVWXB345',
  secretAccessKey: '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',
  region: 'us-east-2',
});

const isImage = (req,file,callbck)=>{
    if(file.mimetype.startsWith('image')){
      console.log('Call back');
      callbck(null,true)
    }else{
        callbck(new Error('Only Image is allowed'))
    }
}

var upload = multer({
    // fileFilter : isImage,
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