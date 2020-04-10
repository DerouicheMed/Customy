const express = require('express');
const GroupService = require('../services/group.service');

const router = express.Router();
const service = new GroupService();

router.post('/',service.add);
router.get('/',service.getAll);

router.put('/',service.update);
router.delete('/',service.delete);

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    await service.findById(id)
    .then(result => res.send(result))
    .catch(err=>res.send(err));
});

module.exports = router;