var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.get('/logout', function(req, res, next) {
    req.session.reset();
    res.json({
        confirmation: 'success',
        user: null
    });
});

router.get('/currentuser', function(req, res, next) {
    if (req.session == null) {
        res.json({
            confirmation: 'success',
            user: null
        });
        return;
    }

    if (req.session.token == null) {
        res.json({
            confirmation: 'success',
            user: null
        });
        return;
    }
    // '123' is the secret on the server, if you change it
    // it will invalidate everyone's token, for security purposes
    jwt.verify(req.session.token, process.env.TOKEN_SECRET, function(err, decode) {
        if (err) {
            req.session.reset();
            res.json({
                confirmation: 'fail',
                message: 'Invalid Token'
            });
            return;
        }

        controllers.profile
        .getById(decode.id)
        .then(function(profile) {
            res.json({
                confirmation: 'success',
                user: profile
            });
        })
        .catch(function(err) {
            res.json({
                confirmation: 'fail',
                message: err
            });
        });

    });
});

router.post('/register', function(req, res, next) {
    
    var formData = req.body;

    controllers.profile
    .post(formData)
    .then(function(profile) {
// When the user signs up, they log in too. Therefore we want 
// to set the session and token  when the user signs up as well 
        req.session.token = jwt.sign({id: profile.id}, process.env.TOKEN_SECRET, {expiresIn:4000});
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

        // req.session.user = profile._id.toString(); // Attach session before Login
        req.session.token = jwt.sign({id: profile._id.toString()}, process.env.TOKEN_SECRET, {expiresIn:4000});
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