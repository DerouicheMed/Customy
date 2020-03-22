const express = require('express');
const UserService = require('../services/user.service');

const router = express.Router();
const service = new UserService();

router.post('/',service.add);
router.get('/',service.getAll);
router.get('/:id',service.getById);
router.put('/',service.update);
router.delete('/',service.delete);

module.exports = router;