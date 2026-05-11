const express = require('express');
const multer = require('multer');
const formidableMiddleware = require('express-formidable');
let router = express.Router();
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: `${process.env.CN_CLOUD_NAME}`,
    api_key: `${process.env.CN_API_KEY}`,
    api_secret: `${process.env.CN_API_SECRET}`
})
// multer configs
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname);
        // cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        // let the file be stored
        cb(null, true);
    } else {
        // not
        cb(null, false);
    }
}
const upload = multer({storage: storage, fileFilter: fileFilter});
// router.route('/multerupload')
//     .post(upload.single('file'), async(req, res) => {
//         try {
//             res.status(200).json({ msg: 'Uploaded!!' });
//         } catch(error) {
//             res.status(400).json({ error });
//         }
//     });
// simple cloudinary
// router.route('/testupload')
//     .post(formidableMiddleware(), async(req, res) => {
//         try {
//             // req.files.file.path
//             const upload = await cloudinary.uploader.upload(
//                 req.files.file.path,
//                 {
//                     public_id: `${Date.now()}`,
//                     folder: 'test_upload'
//                 }
//             );
//             console.log(upload);
//             res.status(200).json({
//                 public_id: upload.public_id,
//                 url: upload.url
//             });
//         } catch(error) {
//             res.status(400).json({ error });
//         }
//     });
// router.route('/testupload')
//     .post(formidableMiddleware(), async(req, res) => {
//         try {
//             // req.files.file.path
//             const upload = await cloudinary.uploader.upload(
//                 req.files.file.path,
//                 {
//                     public_id: `${Date.now()}`,
//                     folder: 'test_upload',
//                     responsive_breakpoints: {
//                         create_derived: true,
//                         bytes_step: 20000,
//                         min_width: 200,
//                         max_width: 1000,
//                         // max_images: 5
//                     }
//                 }
//             );
//             res.status(200).json(upload);
//         } catch(error) {
//             res.status(400).json({ error });
//         }
//     });
router.route('/testupload')
    .post(formidableMiddleware(), async(req, res) => {
        try {
            // req.files.file.path
            const upload = await cloudinary.uploader.upload(
                req.files.file.path,
                {
                    public_id: `${Date.now()}`,
                    folder: 'test_upload',
                    aspect_ratio: '1',
                    radius: 'max',
                    crop: 'thumb',
                    gravity: 'face'
                }
            );
            res.status(200).json(upload);
        } catch(error) {
            res.status(400).json({ error });
        }
    });
module.exports = router;