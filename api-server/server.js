const express = require('express');
const cors = require('cors');
const Parser = require('rss-parser');
const { SignJWT, jwtVerify } = require('jose');
const fs = require('node:fs').promises;
const path = require('node:path');

async function readDataFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading data file at ${filePath}:`, error);
    throw new Error(`Failed to read data file at ${filePath}`);
  }
}

async function writeDataFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing to data file at ${filePath}:`, error);
    throw new Error(`Failed to write to data file at ${filePath}`);
  }
}

const app = express();
const parser = new Parser();
const port = process.env.PORT || 3001;
const articlesPath = path.join(__dirname, 'data', 'articles.json');
const rssFeedsPath = path.join(__dirname, 'data', 'rss-feeds.json');
const servicesPath = path.join(__dirname, 'data', 'services.json');
const specialOffersPath = path.join(__dirname, 'data', 'special-offers.json');
const featureTogglesPath = path.join(__dirname, 'data', 'feature-toggles.json');

async function handleCRUD(req, res, filePath, idField = 'id') {
  try {
    switch (req.method) {
      case 'GET': {
        const data = await readDataFile(filePath);
        res.json(data);
        break;
      }
      case 'POST': {
        const newItem = req.body;
        const data = await readDataFile(filePath);
        data.push(newItem);
        await writeDataFile(filePath, data);
        res.status(201).json({ message: `${filePath.split('/').pop().replace('.json', '').slice(0, -1)} added successfully` });
        break;
      }
      case 'PUT': {
        const { id } = req.params;
        const updatedItem = req.body;
        const data = await readDataFile(filePath);
        const updatedData = data.map((item) =>
          item[idField] === id ? { ...item, ...updatedItem } : item
        );
        await writeDataFile(filePath, updatedData);
        res.json({ message: `${filePath.split('/').pop().replace('.json', '').slice(0, -1)} updated successfully` });
        break;
      }
      case 'DELETE': {
        const { id } = req.params;
        const data = await readDataFile(filePath);
        const updatedData = data.filter((item, index) =>
          idField === 'id' ? item[idField] !== id : index !== Number.parseInt(id)
        );
        await writeDataFile(filePath, updatedData);
        res.json({ message: `${filePath.split('/').pop().replace('.json', '').slice(0, -1)} deleted successfully` });
        break;
      }
      default:
        res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(`Error handling ${filePath.split('/').pop().replace('.json', '').slice(0, -1)}:`, error);
    res.status(500).json({ error: `Failed to handle ${filePath.split('/').pop().replace('.json', '').slice(0, -1)}` });
  }
}

// Specific CORS configuration for by1.net
const ALLOWED_ORIGINS = [
  'https://by1.net',
  'https://www.by1.net',
  'http://localhost:3000' // For development
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true
}));

app.use(express.json());

// Add security headers
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// RSS Feeds endpoint
app.get('/rss', async (req, res) => {
  try {
    const RSS_FEEDS = [
      'https://feeds.feedburner.com/venturebeat/SZYF',
      'https://www.artificialintelligence-news.com/feed/',
      'https://www.unite.ai/feed/'
    ];

    const feedPromises = RSS_FEEDS.map(feed => parser.parseURL(feed));
    const feeds = await Promise.all(feedPromises);
    const allItems = feeds.flatMap(feed => feed.items);
    
    const sortedItems = allItems.sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });
    
    res.json({ items: sortedItems.slice(0, 10) });
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    res.status(500).json({ error: 'Failed to fetch RSS feeds' });
  }
});

// Auth endpoint
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Replace these credentials with secure ones
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);
    
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Articles endpoint
app.post('/articles', async (req, res) => {
  try {
    const newArticle = req.body;
    const articles = await readDataFile(articlesPath);
    articles.push(newArticle);
    await writeDataFile(articlesPath, articles);
    res.status(201).json({ message: 'Article saved successfully' });
  } catch (error) {
    console.error('Error saving article:', error);
    res.status(500).json({ error: 'Failed to save article' });
  }
});

app.get('/articles', async (req, res) => {
  try {
    const articles = await readDataFile(articlesPath);
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// RSS Feeds Management
app.get('/rss-feeds', async (req, res) => {
  try {
    const rssFeeds = await readDataFile(rssFeedsPath);
    res.json(rssFeeds);
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    res.status(500).json({ error: 'Failed to fetch RSS feeds' });
  }
});

app.post('/rss-feeds', async (req, res) => {
  try {
    const newFeed = req.body;
    const rssFeeds = await readDataFile(rssFeedsPath);
    rssFeeds.push(newFeed);
    await writeDataFile(rssFeedsPath, rssFeeds);
    res.status(201).json({ message: 'RSS feed added successfully' });
  } catch (error) {
    console.error('Error adding RSS feed:', error);
    res.status(500).json({ error: 'Failed to add RSS feed' });
  }
});

app.delete('/rss-feeds/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rssFeeds = await readDataFile(rssFeedsPath);
    const updatedFeeds = rssFeeds.filter((feed, index) => index !== Number.parseInt(id));
    await writeDataFile(rssFeedsPath, updatedFeeds);
    res.json({ message: 'RSS feed deleted successfully' });
  } catch (error) {
    console.error('Error deleting RSS feed:', error);
    res.status(500).json({ error: 'Failed to delete RSS feed' });
  }
});

// Services Management
app.get('/services', async (req, res) => {
  try {
    const services = await readDataFile(servicesPath);
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

app.post('/services', async (req, res) => {
  try {
    const newService = req.body;
    const services = await readDataFile(servicesPath);
    services.push(newService);
    await writeDataFile(servicesPath, services);
    res.status(201).json({ message: 'Service added successfully' });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ error: 'Failed to add service' });
  }
});

app.put('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = req.body;
    const services = await readDataFile(servicesPath);
    const updatedServices = services.map((service, index) =>
      index === Number.parseInt(id) ? { ...service, ...updatedService } : service
    );
    await writeDataFile(servicesPath, updatedServices);
    res.json({ message: 'Service updated successfully' });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

app.delete('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const services = await readDataFile(servicesPath);
    const updatedServices = services.filter((service, index) => index !== Number.parseInt(id));
    await writeDataFile(servicesPath, updatedServices);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// Special Offers Management
app.get('/special-offers', async (req, res) => {
  try {
    const specialOffers = await readDataFile(specialOffersPath);
    res.json(specialOffers);
  } catch (error) {
    console.error('Error fetching special offers:', error);
    res.status(500).json({ error: 'Failed to fetch special offers' });
  }
});

app.post('/special-offers', async (req, res) => {
  try {
    const newOffer = req.body;
    const specialOffers = await readDataFile(specialOffersPath);
    specialOffers.push(newOffer);
    await writeDataFile(specialOffersPath, specialOffers);
    res.status(201).json({ message: 'Special offer added successfully' });
  } catch (error) {
    console.error('Error adding special offer:', error);
    res.status(500).json({ error: 'Failed to add special offer' });
  }
});

app.put('/special-offers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOffer = req.body;
    const specialOffers = await readDataFile(specialOffersPath);
    const updatedOffers = specialOffers.map((offer, index) =>
      index === Number.parseInt(id) ? { ...offer, ...updatedOffer } : offer
    );
    await writeDataFile(specialOffersPath, updatedOffers);
    res.json({ message: 'Special offer updated successfully' });
  } catch (error) {
    console.error('Error updating special offer:', error);
    res.status(500).json({ error: 'Failed to update special offer' });
  }
});

app.delete('/special-offers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const specialOffers = await readDataFile(specialOffersPath);
    const updatedOffers = specialOffers.filter((offer, index) => index !== Number.parseInt(id));
    await writeDataFile(specialOffersPath, updatedOffers);
    res.json({ message: 'Special offer deleted successfully' });
  } catch (error) {
    console.error('Error deleting special offer:', error);
    res.status(500).json({ error: 'Failed to delete special offer' });
  }
});

// Feature Toggles Management
app.get('/feature-toggles', async (req, res) => {
  try {
    const featureToggles = await readDataFile(featureTogglesPath);
    res.json(featureToggles);
  } catch (error) {
    console.error('Error fetching feature toggles:', error);
    res.status(500).json({ error: 'Failed to fetch feature toggles' });
  }
});

app.put('/feature-toggles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedToggle = req.body;
    const featureToggles = await readDataFile(featureTogglesPath);
     const updatedToggles = featureToggles.map((toggle) =>
      toggle.id === id ? { ...toggle, ...updatedToggle } : toggle
    );
    await writeDataFile(featureTogglesPath, updatedToggles);
    res.json({ message: 'Feature toggle updated successfully' });
  } catch (error) {
    console.error('Error updating feature toggle:', error);
    res.status(500).json({ error: 'Failed to update feature toggle' });
  }
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
  console.log(`Allowed origins: ${ALLOWED_ORIGINS.join(', ')}`);
});
