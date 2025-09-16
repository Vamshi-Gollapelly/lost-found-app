// backend/src/routes/item.js
const router = require('express').Router();
const ctrl = require('../controllers/itemsController');

// Create
router.post('/', ctrl.createItem);

// List
router.get('/', ctrl.getItems);

// Read one
router.get('/:id', ctrl.getItem);

// Update
router.patch('/:id', ctrl.updateItem);

// Delete
router.delete('/:id', ctrl.deleteItem);

module.exports = router;
