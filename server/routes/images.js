const express = require("express");
const easyimg = require('easyimage');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const ImageScheme = require('../models/image-model');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/imgs');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }

    
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

async function convertsmall(source) {
    try {
        let strData;
        if (source.includes(".png")) {
            strData = source.replace(".png", "_small.png");
        }
        if (source.includes(".jpg")) {
            strData = source.replace(".jpg", "_small.jpg");
        }
        if (source.includes(".jpeg")) {
            strData = source.replace(".jpeg", "_small.jpeg");
        }
        await easyimg.resize({
            src: source,
            dst: strData,
            height: 50,
            width: 50 
        })
        console.log(strData);
        console.log("image resized");
    } catch (e) {
        console.log(e);
    }
}

router.get("/:email", (req, res) => {
    ImageScheme.findOne({ userEmail: req.params.email }, (err, image) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!image) {
            return res.status(200).json({ success: true, data: false })
        }
        return res.status(200).json({ success: true, data: image })
    }).catch(err => console.log(err))
});

router.delete("/:email", (req, res) => {
    ImageScheme.findOneAndDelete({ userEmail: req.params.email }, (err, image) => {
        if (err) {
            res.status(400).json( {success: false, error: err })
            return;
        }
        if (!image) {
            res.status(200).json({ success: true, data: false })
            return;
        }
        try{
            fs.unlinkSync(image.imageData);
            if (image.imageData.includes(".png")) {
                fs.unlinkSync(image.imageData.replace(".png", "_small.png"));
            }
            if (image.imageData.includes(".jpg")) {
                fs.unlinkSync(image.imageData.replace(".jpg", "_small.jpg"));
            }
            if (image.imageData.includes(".jpeg")) {
                fs.unlinkSync(image.imageData.replace(".jpeg", "_small.jpeg"));
            }
            console.log("old image removed locally");
            res.status(200).json({ success: true, data: image })
            return;
        } catch (err) {
            res.status(400).send(err);
            return;
        }
    })
})

router.route("/uploadmulter")
    .post(upload.single('imageData'), (req, res, next) => {
        const newImage = new ImageScheme({
            userEmail: req.body.userEmail,
            imageName: req.body.imageName,
            imageData: req.file.path
        });

        newImage.save()
        .then((result) => {
            res.status(200).json({
                success: true,
                document: result
            });

            convertsmall(req.file.path);

        })
        .catch((err) => next(err));


});



module.exports = router;