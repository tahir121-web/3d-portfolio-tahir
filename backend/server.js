const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB Atlas only if MONGODB_URI is provided
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
  db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
  });

  // Project Schema
  const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    tags: [{
      name: String,
      color: String
    }],
    image: String,
    sourceCodeLink: String,
    demoLink: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  // Contact Message Schema
  const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  // Review Schema
  const reviewSchema = new mongoose.Schema({
    name: String,
    email: String,
    company: String,
    position: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    approved: {
      type: Boolean,
      default: false // Reviews need approval before being displayed
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  const Project = mongoose.model('Project', projectSchema);
  const ContactMessage = mongoose.model('ContactMessage', contactSchema);
  const Review = mongoose.model('Review', reviewSchema);

  // Routes for Projects
  app.get('/api/projects', async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post('/api/projects', async (req, res) => {
    try {
      const project = new Project(req.body);
      const savedProject = await project.save();
      res.status(201).json(savedProject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put('/api/projects/:id', async (req, res) => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedProject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete('/api/projects/:id', async (req, res) => {
    try {
      await Project.findByIdAndDelete(req.params.id);
      res.json({ message: 'Project deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Routes for Contact Messages
  app.post('/api/contact', async (req, res) => {
    try {
      const contactMessage = new ContactMessage(req.body);
      await contactMessage.save();
      
      // For now, we'll just save the message to the database
      // In a production environment, you would also send an email here
      res.status(201).json({ 
        message: 'Message received successfully! I will get back to you soon.',
        data: contactMessage
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get all contact messages (for admin panel - future enhancement)
  app.get('/api/contact-messages', async (req, res) => {
    try {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Routes for Reviews
  app.post('/api/reviews', async (req, res) => {
    try {
      const review = new Review(req.body);
      // Set approved to false by default - you'll need to approve reviews in admin panel
      review.approved = false;
      const savedReview = await review.save();
      res.status(201).json({ 
        message: 'Review submitted successfully! It will be visible after approval.',
        data: savedReview
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get all approved reviews (for frontend display)
  app.get('/api/reviews', async (req, res) => {
    try {
      const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get all reviews (for admin panel)
  app.get('/api/reviews/all', async (req, res) => {
    try {
      const reviews = await Review.find().sort({ createdAt: -1 });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Approve a review (for admin panel)
  app.put('/api/reviews/:id/approve', async (req, res) => {
    try {
      const updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        { approved: true },
        { new: true }
      );
      res.json(updatedReview);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Delete a review (for admin panel)
  app.delete('/api/reviews/:id', async (req, res) => {
    try {
      await Review.findByIdAndDelete(req.params.id);
      res.json({ message: 'Review deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
} else {
  console.log('MONGODB_URI not provided. Skipping MongoDB connection.');
  
  // Provide mock responses for API endpoints when MongoDB is not available
  app.get('/api/projects', (req, res) => {
    res.json([]);
  });
  
  app.get('/api/contact-messages', (req, res) => {
    res.json([]);
  });
  
  app.get('/api/reviews', (req, res) => {
    res.json([]);
  });
  
  app.get('/api/reviews/all', (req, res) => {
    res.json([]);
  });
}

// Serve admin panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend server is running', 
    status: 'OK',
    timestamp: new Date().toISOString(),
    mongodb: process.env.MONGODB_URI ? 'connected' : 'not configured'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Admin panel available at http://localhost:${PORT}/admin`);
});