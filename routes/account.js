var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var bcrypt = require('bcryptjs');

router.get('/currentuser', function(req, res, next) {
    if (req.session == null) {
        res.json({
            confirmation: 'success',
            user: null
        });
        return;
    }

    if (req.session.user == null) {
        res.json({
            confirmation: 'success',
            user: null
        });
        return;
    }
    res.json({
        confirmation: 'success',
        user: req.session.user
    });
});

router.post('/register', function(req, res, next) {
    
    var formData = req.body;

    controllers.profile
    .post(formData)
    .then(function(profile) {
        res.redirect('/profile');
        return;
    })
    .catch(function(err) {
        next(err);
    });

});

router.post('/login', function(req, res, next) {
    
    var formData = req.body; // email, password

    controllers.profile
    .get({email: formData.email}, true) // only checks if the email EXISTS
    .then(function(profiles) {
        if (profiles.length == 0) {
            res.json({
                confirmation: 'fail',
                message: 'Profile not found'
            });
            return;
        } 

        var profile = profiles[0];
    // Checks if the password matches the password from the Model
        var passwordCorrect = bcrypt.compareSync(formData.password, profile.password);
        if (passwordCorrect == false) {
            req.session.reset(); // When wrong password is typed, session is RESET to null
            res.json({
                confirmation: 'fail',
                message: 'Wrong Password'
            });
            return;
        }

        req.session.user = profile._id.toString(); // Attach session before Login
        res.redirect('/profile');
    })
    .catch(function(err) {
        res.json({
            confirmation: 'fail',
            message: err
        });
    });

});

module.exports = router;