const express = require('express')
const router = express.Router()
const participantController = require('../controllers/ParticipantController')
const verifyMiddleware = require('../middleware/verifyMiddleware')
const typesMiddleware = require('../middleware/typesMiddleware')

const cloudinary = require('cloudinary')
const multer = require('multer');


router.post('/register', verifyMiddleware, typesMiddleware ,  async(req, res)=>{
    participantController.register(req, res)
})





// Screenshot Router 

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.post('/uploadimage', upload.single('transactionImage'), async (req, res) => {
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
            return { success: false, link: "" };
        }
    };

    const { success, link } = await uploadCloud(req.file.buffer)
    if( success){
        res.json({ "transactionLink" : link}) 
    }else{
        res.send("Failed to upload")
    }

    } catch (error) {
      console.error('Image upload failed:', error);
      res.status(500).json({ message: 'Image upload failed' });
    }
  });
  
  

module.exports = router