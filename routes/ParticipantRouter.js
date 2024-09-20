const express = require('express')
const router = express.Router()
const participantController = require('../controllers/ParticipantController')
const verifyMiddleware = require('../middleware/verifyMiddleware')
const typesMiddleware = require('../middleware/typesMiddleware')

const cloudinary = require('cloudinary')
const multer = require('multer');

const logger = require('../config/logger')

router.post('/register',  typesMiddleware, verifyMiddleware ,  async(req, res)=>{
    participantController.register(req, res)
})





// Screenshot Router 

const storage = multer.memoryStorage();
const upload = multer({ storage });
const MulterErrorMiddleware = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      logger.writeLog(err.message)
      console.log(err.message)
      return res.status(400).json({ message: 'Invalid file upload' })
    } else if (err) {
      logger.writeLog(err.message)
      return res.status(500).json({ message: 'File upload error: ' }) 
    }
    next();
  };
  
  
router.post('/uploadimage', upload.single('transactionImage'), MulterErrorMiddleware ,async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' });
      }
      cloudinary.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        secure: true,
    });
      const uploadCloud = async (buffer) => {
        try {
            const result = await new Promise((resolve) => {
                cloudinary.v2.uploader
                    .upload_stream({
                        folder:"TFScreenshot",
                        resource_type:"image"
                    },(error, uploadResult) => {
                        if(error){
                            console.log(error);
                            console.log("error in cloudinary upload")
                        }
                        return resolve(uploadResult);
                    })
                    .end(buffer);
            });
            return { success: true, link: result.secure_url };
        } catch (error) {
            console.log("error in cloudinary upload")
            console.log(error);
            logger.writeLog(error);
            return { success: false, link: "" };
        }
    };

    const { success, link } = await uploadCloud(req.file.buffer)
    if( success){
        res.json({ "transactionLink" : link}) 
    }else{
        res.status(400)
        res.send("Image Rejected. Check Format.")
    }

    } catch (error) {
      console.error('Image upload failed:', error);
      logger.writeLog(error)
      res.status(500).json({ message: 'Image upload failed' });
    }
  });
  

  

module.exports = router