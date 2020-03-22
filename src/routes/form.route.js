const express = require('express');
const FormService = require('../services/form.service');

const router = express.Router();
const service = new FormService();

router.post('/',service.add);
router.get('/',service.getAll);
router.get('/getbystudy',service.getByStudy);
router.get('/:id',service.getById);
router.put('/',service.update);
router.delete('/',service.delete);

module.exports = router;