 import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Item from '../src/models/Item.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lost_found_dev';

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected (seed)');

    await Item.deleteMany({});
    console.log('Cleared items');

    const now = new Date();
    await Item.insertMany([
      {
        title: 'Black Wallet',
        description: 'Black leather wallet with a silver logo',
        status: 'lost',
        category: 'accessories',
        location: 'Deakin Library',
        date: now,
        contactName: 'John',
        contactEmail: 'john@example.com'
      },
      {
        title: 'iPhone 13',
        description: 'Blue case, lock screen with beach photo',
        status: 'found',
        category: 'electronics',
        location: 'Food court near Oporto',
        date: now
      },
      {
        title: 'Backpack',
        description: 'Grey backpack with SIT725 notes',
        status: 'lost',
        category: 'bags',
        location: 'Tram 75 stop',
        date: now
      }
    ]);

    console.log('Seeded items');
    await mongoose.disconnect();
    console.log('Done');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
