// backend/src/controllers/itemsController.js
const Item = require('../models/Item');

// POST /api/items  → create item
exports.createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    console.error('createItem error:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', details: Object.values(err.errors).map(e => e.message) });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/items  → list with filters & pagination
exports.getItems = async (req, res) => {
  try {
    const { status, category, q, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (q) filter.title = { $regex: q, $options: 'i' };

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Item.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Item.countDocuments(filter),
    ]);

    res.json({
      data: items,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) },
    });
  } catch (err) {
    console.error('getItems error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/items/:id  → get single item
exports.getItem = async (req, res) => {
  try {
    const doc = await Item.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Item not found' });
    res.json(doc);
  } catch (err) {
    console.error('getItem error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH /api/items/:id  → update item
exports.updateItem = async (req, res) => {
  try {
    const doc = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: 'Item not found' });
    res.json(doc);
  } catch (err) {
    console.error('updateItem error:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', details: Object.values(err.errors).map(e => e.message) });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/items/:id  → delete item
exports.deleteItem = async (req, res) => {
  try {
    const doc = await Item.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    console.error('deleteItem error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
