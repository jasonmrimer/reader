const express = require('express');
const router = express.Router();

const passage = require('../models/passage.js');

//retrieving passages
router.get('/passages', (request, response, next) => {
    passage.find((err, passages) => {
        response.json(passages);
    })
});

module.exports = router;