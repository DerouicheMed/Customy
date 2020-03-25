const express = require('express');
const ResponseService = require('../services/response.service');

const router = express.Router();
const service = new ResponseService();

router.post('/',service.add);
router.get('/',service.getAll);
router.get('/getbyquestion',service.getByQuestion);
router.get('/:id',service.getById);
router.put('/',service.update);
router.delete('/',service.delete);

module.exports = router;