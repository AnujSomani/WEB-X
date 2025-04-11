import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Sample data - In a real application, this would come from a database
const cafes = [
  {
    id: '1',
    name: 'The Coffee House',
    rating: 4.5,
    category: 'Coffee Shop',
    location: {
      address: '123 Main St, City',
      lat: 40.7128,
      lng: -74.0060
    },
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
    description: 'A cozy coffee shop with artisanal coffee and fresh pastries.'
  },
  {
    id: '2',
    name: 'Riverside Cafe',
    rating: 4.2,
    category: 'Bistro',
    location: {
      address: '456 River Rd, City',
      lat: 40.7150,
      lng: -74.0060
    },
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    description: 'Beautiful riverside cafe serving breakfast and lunch.'
  },
  {
    id: '3',
    name: 'Sweet Treats Bakery',
    rating: 4.8,
    category: 'Bakery',
    location: {
      address: '789 Oak St, City',
      lat: 40.7140,
      lng: -74.0080
    },
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8',
    description: 'Fresh baked goods and specialty coffee in a charming setting.'
  }
];

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/cafes', (req, res) => {
  res.json(cafes);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});