// populateDB.js
const mongoose = require('mongoose');
const Painting = require('./models/Painting');
const fs = require('fs');

// Replace this with your MongoDB Atlas connection string
const uri = 'mongodb+srv://nathanielfrait:8UMenCzPs5Aw2faP@nfmlactivity6.uy4d5.mongodb.net/Paintings';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB Atlas');
        // Read the art.json file
        const paintingsData = JSON.parse(fs.readFileSync('art.json', 'utf8'));

        // Insert the paintings data into MongoDB
        await Painting.insertMany(paintingsData);
        console.log('Data inserted successfully');
        mongoose.disconnect();
    })
    .catch(err => console.error('Error:', err));