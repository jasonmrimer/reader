const express = require('express');
const router = express.Router();

const contact = require('../models/contactSchema.js');
const passage = require('../models/passage.js');

//retrieving contacts
router.get('/contacts', (req, res, next) => {
    contact.find((err, contacts) => {
        res.json(contacts);
    })
});

//retrieving passages
router.get('/passages', (request, response, next) => {
    passage.find((err, passages) => {
        response.json(passages);
    })
});

//adding contacts
router.post('/contacts', (req, res, next) => {
    let newContact = new contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    });

    console.log(newContact);

    newContact.save((err, contact) => {
        if (err) {
            res.send(err);
        } else {
            res.send(contact);
        }
    });
});

//deleting a contact
router.delete('/contact/:id', (req, res, next) => {
    contact.remove({_id: req.params.id}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;