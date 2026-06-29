const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Registration = require('../models/Registration');
const path = require('path');
const auth = require('http-auth');

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req, res) => {
    res.render('form', { title: 'Registration form' });
});

router.get('/registrations', basic.check((req, res) => {
    Registration.find()
        .then((registrations) => {
            res.render('index', { title: 'Registration list', registrations });
        })
        .catch((err) => {
            console.error('Error fetching registrations:', err);
            res.send('Sorry! Something went wrong.');
        });
}));

router.post('/',
    [
        check('name')
            .isLength({ min: 1 })
            .withMessage('Please enter a name'),
        check('email')
            .isLength({ min: 1 })
            .withMessage('Please enter an email'),
    ],
    (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration.save()
                .then(() => {
                    res.send('Registration successful!');
                })
                .catch((err) => {
                    console.error('Error saving registration:', err);
                    res.send('Sorry! Something went wrong.');
                });
        } else {
            res.render('form', {
                title: 'Registration form',
                errors: errors.array(),
                data: req.body,
            });
        }
    }
);

module.exports = router;