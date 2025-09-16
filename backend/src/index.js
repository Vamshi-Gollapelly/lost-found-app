import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Placeholder in-memory items
const items = [
  { id: 1, type: 'lost', name: 'Black Wallet', location: 'Library', date: '2025-09-10' },
  { id: 2, type: 'found', name: 'Blue Water Bottle', location: 'Cafeteria', date: '2025-09-11' }
];

app.get('/health', (_req, res) => res.json({ ok: true }));

app.get('/api/items', (_req, res) => res.json(items));

app.post('/api/items', (req, res) => {
  const { type, name, location, date } = req.body || {};
    if (!type || !name || !location || !date) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const id = items.length + 1;
  items.push({ id, type, name, location, date });
  res.status(201).json({ id });

})

app.listen(PORT, () => {
  console.log(`Lost & Found backend running on http://localhost:${PORT}`);
});
// initial touch by vikas
