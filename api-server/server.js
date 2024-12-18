const express = require('express');
const cors = require('cors');
const Parser = require('rss-parser');
const { SignJWT, jwtVerify } = require('jose');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const parser = new Parser();
const port = process.env.PORT || 3001;
const articlesPath = path.join(__dirname, 'data', 'articles.json');
const rssFeedsPath = path.join(__dirname, 'data', 'rss-feeds.json');
const servicesPath = path.join(__dirname, 'data', 'services.json');
const specialOffersPath = path.join(__dirname, 'data', 'special-offers.json');
const featureTogglesPath = path.join(__dirname, 'data', 'feature-toggles.json');

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
    const articles = JSON.parse(await fs.readFile(articlesPath, 'utf-8'));
    articles.push(newArticle);
    await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));
    res.status(201).json({ message: 'Article saved successfully' });
  } catch (error) {
    console.error('Error saving article:', error);
    res.status(500).json({ error: 'Failed to save article' });
  }
});

app.get('/articles', async (req, res) => {
  try {
    const articles = JSON.parse(await fs.readFile(articlesPath, 'utf-8'));
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// RSS Feeds Management
app.get('/rss-feeds', async (req, res) => {
  try {
    const rssFeeds = JSON.parse(await fs.readFile(rssFeedsPath, 'utf-8'));
    res.json(rssFeeds);
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    res.status(500).json({ error: 'Failed to fetch RSS feeds' });
  }
});

app.post('/rss-feeds', async (req, res) => {
  try {
    const newFeed = req.body;
    const rssFeeds = JSON.parse(await fs.readFile(rssFeedsPath, 'utf-8'));
    rssFeeds.push(newFeed);
    await fs.writeFile(rssFeedsPath, JSON.stringify(rssFeeds, null, 2));
    res.status(201).json({ message: 'RSS feed added successfully' });
  } catch (error) {
    console.error('Error adding RSS feed:', error);
    res.status(500).json({ error: 'Failed to add RSS feed' });
  }
});

app.delete('/rss-feeds/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rssFeeds = JSON.parse(await fs.readFile(rssFeedsPath, 'utf-8'));
    const updatedFeeds = rssFeeds.filter((feed, index) => index !== parseInt(id));
    await fs.writeFile(rssFeedsPath, JSON.stringify(updatedFeeds, null, 2));
    res.json({ message: 'RSS feed deleted successfully' });
  } catch (error) {
    console.error('Error deleting RSS feed:', error);
    res.status(500).json({ error: 'Failed to delete RSS feed' });
  }
});

// Services Management
app.get('/services', async (req, res) => {
  try {
    const services = JSON.parse(await fs.readFile(servicesPath, 'utf-8'));
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

app.post('/services', async (req, res) => {
  try {
    const newService = req.body;
    const services = JSON.parse(await fs.readFile(servicesPath, 'utf-8'));
    services.push(newService);
    await fs.writeFile(servicesPath, JSON.stringify(services, null, 2));
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
    const services = JSON.parse(await fs.readFile(servicesPath, 'utf-8'));
    const updatedServices = services.map((service, index) =>
      index === parseInt(id) ? { ...service, ...updatedService } : service
    );
    await fs.writeFile(servicesPath, JSON.stringify(updatedServices, null, 2));
    res.json({ message: 'Service updated successfully' });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

app.delete('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const services = JSON.parse(await fs.readFile(servicesPath, 'utf-8'));
    const updatedServices = services.filter((service, index) => index !== parseInt(id));
    await fs.writeFile(servicesPath, JSON.stringify(updatedServices, null, 2));
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// Special Offers Management
app.get('/special-offers', async (req, res) => {
  try {
    const specialOffers = JSON.parse(await fs.readFile(specialOffersPath, 'utf-8'));
    res.json(specialOffers);
  } catch (error) {
    console.error('Error fetching special offers:', error);
    res.status(500).json({ error: 'Failed to fetch special offers' });
  }
});

app.post('/special-offers', async (req, res) => {
  try {
    const newOffer = req.body;
    const specialOffers = JSON.parse(await fs.readFile(specialOffersPath, 'utf-8'));
    specialOffers.push(newOffer);
    await fs.writeFile(specialOffersPath, JSON.stringify(specialOffers, null, 2));
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
    const specialOffers = JSON.parse(await fs.readFile(specialOffersPath, 'utf-8'));
    const updatedOffers = specialOffers.map((offer, index) =>
      index === parseInt(id) ? { ...offer, ...updatedOffer } : offer
    );
    await fs.writeFile(specialOffersPath, JSON.stringify(updatedOffers, null, 2));
    res.json({ message: 'Special offer updated successfully' });
  } catch (error) {
    console.error('Error updating special offer:', error);
    res.status(500).json({ error: 'Failed to update special offer' });
  }
});

app.delete('/special-offers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const specialOffers = JSON.parse(await fs.readFile(specialOffersPath, 'utf-8'));
    const updatedOffers = specialOffers.filter((offer, index) => index !== parseInt(id));
    await fs.writeFile(specialOffersPath, JSON.stringify(updatedOffers, null, 2));
    res.json({ message: 'Special offer deleted successfully' });
  } catch (error) {
    console.error('Error deleting special offer:', error);
    res.status(500).json({ error: 'Failed to delete special offer' });
  }
});

// Feature Toggles Management
app.get('/feature-toggles', async (req, res) => {
  try {
    const featureToggles = JSON.parse(await fs.readFile(featureTogglesPath, 'utf-8'));
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
    const featureToggles = JSON.parse(await fs.readFile(featureTogglesPath, 'utf-8'));
    const updatedToggles = featureToggles.map((toggle) =>
      toggle.id === id ? { ...toggle, ...updatedToggle } : toggle
    );
    await fs.writeFile(featureTogglesPath, JSON.stringify(updatedToggles, null, 2));
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
