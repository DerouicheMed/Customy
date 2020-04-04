const express = require('express');
const FormService = require('../services/form.service');

const multer  = require('multer')

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, '../uploads/');
    },
    filename : function (req,file,cb){
        cb(null,file.originalname);
    }
})

const upload = multer({ storage : storage })

const router = express.Router();
const service = new FormService();

router.post('/',service.add);
router.get('/',service.getAll);
router.get('/getbystudy',service.getByStudy);
router.get('/:id',service.getById);
router.put('/',service.update);
router.delete('/',service.delete);


router.post('/upload',upload.array('file'), (req,res,next)=>{
    res.status(200).json({message: 'images successfully saved'});
});

module.exports = router;