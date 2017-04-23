var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var controllers = require('../controllers');

router.get('/', function(req, res, next) {
  res.render('index', { header: 'Practice', visitor: 'John' });
});

router.get('/profile', function(req, res, next) {
   if (req.session == null) {
        return;
    }

    if (req.session.token == null) {
        res.render('profile', null);
        return;
    }

  jwt.verify(req.session.token, process.env.TOKEN_SECRET, function(err, decode) {
    if (err) {
        res.render('profile', null);
        return;
    }
    var user = null;

    controllers.profile
    .getById(decode.id)
    .then(function(profile) {
        user = profile;
    // Fetch profile comments
    // .get() returns a promise, so call .then() after
        return controllers.comment.get({profile: profile.id });
    })
    .then(function(comments) {
        console.log('COMMENTS: '+ JSON.stringify(comments));
        var data = {
            profile: user,
            comments: comments
        };
        
        res.render('profile', data); 
    })
    .catch(function(err) {
        res.render('profile', null);
    });
  });
});

module.exports = router;
