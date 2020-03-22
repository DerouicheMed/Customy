const express = require('express');
const StudyService = require('../services/study.service');

const router = express.Router();
const service = new StudyService();

router.post('/',service.add);
router.get('/',service.getAll);
router.get('/:id',service.getById);
router.put('/',service.update);
router.delete('/',service.delete);

module.exports = router;