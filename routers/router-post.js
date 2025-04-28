const express = require('express');
const router = express.Router();

const controller = require(`../controllers/controller-posts`);

// INDEX
router.get('/', controller.index);

// SHOW
router.get('/:id', controller.show);

// STORE
router.post('/', controller.store);

// UPDATE
router.put('/:id', controller.update);

// MODIFY
router.patch('/:id', controller.modify)

// DESTROY
router.delete('/:id', controller.destroy);

// ESPORTAZIONE ROUTER
module.exports = router;