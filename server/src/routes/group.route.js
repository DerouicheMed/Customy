const express = require('express');
const GroupService = require('../services/group.service');

const router = express.Router();
const service = new GroupService();

router.post('/',service.add);
router.get('/',service.getAll);
router.get('/:id',service.getById);
router.put('/',service.update);
router.delete('/',service.delete);

module.exports = router;