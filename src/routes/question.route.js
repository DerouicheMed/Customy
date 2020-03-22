const express = require('express');
const QuestionService = require('../services/question.service');

const router = express.Router();
const service = new QuestionService();

router.post('/',service.add);
router.get('/',service.getAll);
router.get('/getbyform',service.getByForm);
router.get('/:id',service.getById);
router.put('/',service.update);
router.delete('/',service.delete);

module.exports = router;