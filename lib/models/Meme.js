const mongoose = require('mongoose');

// Create a Meme model with top, image, and bottom fields.
const memeSchema = new mongoose.Schema({
    top: String,
    image: String,
    bottom: String
});

module.exports = mongoose.model('Meme', memeSchema);
