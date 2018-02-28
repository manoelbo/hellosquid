// DB Shemas para hashtags
'use strict';

var mongoose = require('mongoose');

var hashtagSchema = new mongoose.Schema({
    hashtag: {
        type: String,
        required: true,
        unique: true
    }
});

var model = mongoose.model('Hashtag', hashtagSchema);

module.exports = model;
