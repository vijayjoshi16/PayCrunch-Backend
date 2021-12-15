const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
    title: String,
    description: String,
    publishedAt: Date,
    thumbnail: String
});

module.exports = mongoose.model("Video",VideoSchema);