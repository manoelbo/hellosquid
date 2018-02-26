'use strict'

const express = require('express');
const apiRouter = express.Router();
const bodyParser = require('body-parser')

const ctrlHashtags = require('../controllers/hashtag');

/* GET HASHTAGS list. */
apiRouter.get('/hashtags', ctrlHashtags.getAllHashtags);

/* POST HASHTAG */
apiRouter.post('/hashtags', bodyParser.json(), ctrlHashtags.addHashtag);

/* DELETE HASHTAG */
apiRouter.delete('/hashtags/:id', ctrlHashtags.removeHashtag);

/* GET INSTAGRAM SEARCH */
apiRouter.get('/hashtags/search/:term', ctrlHashtags.searchHashtagsOnInstagram);

module.exports = apiRouter;
