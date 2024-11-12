const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');
const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/artgallery', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Serve static files from the 'public' folder
app.use("/static", express.static(path.join(__dirname, "public")));

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get all paintings
app.get('/api/paintings', async (req, res) => {
    try {
        const paintings = await Painting.find(); // Get all paintings from MongoDB
        res.json(paintings);
    } catch (err) {
        res.status(500).send('Error retrieving paintings');
    }
});

// Route for serving HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat-client.html'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));