const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Painting = require('./models/Painting'); // Import Painting model
const app = express();

// MongoDB connection string - use your MongoDB Atlas URI
const uri = 'mongodb+srv://nathanielfrait:8UMenCzPs5Aw2faP@nfmlactivity6.uy4d5.mongodb.net/Paintings';

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Serve static files from the 'public' folder
app.use("/static", express.static(path.join(__dirname, "public")));

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get all paintings
app.get('/api/paintings', async (req, res) => {
    try {
        const paintings = await Painting.find(); // Get all paintings from MongoDB
        res.json(paintings); // Respond with the data as JSON
    } catch (err) {
        res.status(500).send('Error retrieving paintings');
    }
});

// Route for serving the HTML file (if you have one for the client)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat-client.html'));
});

app.put('/api/paintings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPainting = req.body;
        console.log('Updating painting with ID:', id);
        console.log('Updated data:', updatedPainting);

        const painting = await Painting.findByIdAndUpdate(id, updatedPainting, { new: true });
        if (!painting) {
            console.log('Painting not found');
            return res.status(404).send('Painting not found');
        }

        res.json(painting);
    } catch (error) {
        console.log('Error updating painting:', error);
        res.status(500).send('Error updating painting');
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));