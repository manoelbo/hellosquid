'use strict';

const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const Hashtag = mongoose.model('Hashtag'); // Hashtag model defined at ../models/hashtag.js

const apiToken = process.env.INSTAGRAM_ACCESS_TOKEN;

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

module.exports.getAllHashtags = (req, res) => {
    Hashtag.find({}).exec((err, hashtags) => {
        if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }

        sendJSONresponse(res, 200, hashtags);
    });
};

module.exports.addHashtag = (req, res) => {
    const new_hashtag = {
        hashtag: req.body.hashtag
    };

    Hashtag.create(new_hashtag, (err, hashtag) => {
        if (err) {
            sendJSONresponse(res, 400, err);
        } else {
            sendJSONresponse(res, 201, hashtag);
        }
    });
};

module.exports.removeHashtag = (req, res) => {
    const id = req.params.id;
    if (id) {
        Hashtag.findByIdAndRemove(id).exec((err, hashtag) => {
            if (err) {
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 204, {
                success: `Hashtag ${id} deleted`
            });
        });
    } else {
        sendJSONresponse(res, 404, {
            error: 'not found, hashtag id require'
        });
    }
};

module.exports.searchHashtagsOnInstagram = (req, res) => {
    const term = req.params.term;
    if (term) {
        const path = `https://api.instagram.com/v1/tags/${term}/media/recent?access_token=${apiToken}`;
        const requestOptions = {
            url: path,
            method: 'GET',
            json: {}
        };
        request(requestOptions, (error, response, body) => {
            if (!error) {
                sendJSONresponse(res, response.statusCode, body);
            } else {
                sendJSONresponse(res, 500, error);
            }
        });
    } else {
        sendJSONresponse(res, 404, {
            error: 'not found, search term is require'
        });
    }
};
