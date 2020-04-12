const express = require('express');
const QuestionService = require('../services/question.service');

const router = express.Router();
const service = new QuestionService();


router.get('/',service.getAll);
router.get('/getbyform',service.getByForm);
router.get('/:id',service.getById);
router.put('/',service.update);
router.delete('/',service.delete);


router.post('/',(req,res)=>{
    let data = req.body;
    service.add(data)
    .then(result=>res.send(result))
    .catch(err=>{
        console.log(err);
        res.status('500').send(err);
    })
});

module.exports = router;