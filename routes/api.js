var express = require('express');
var router = express.Router();
var Profile = require('../models/Profile');

router.post('/:resource', function(req, res, next) {
    var resource = req.params.resource;
    if (resource == 'profile') { // create profile
        
        var formData = req.body;
        Profile.create(formData, function(err, profile) {
            if (err) {
                res.json({
                    confirmation: 'fail',
                    message: err
                });

                return;
            }
    
            res.json({
                confirmation: 'success',
                result: profile
            });
        });

        return;
    }

    res.json({
        confirmation: 'fail',
        message: 'Resource ' + resource + ' not supported'
    });

});


router.get('/:resource', function(req, res, next) {

    var resource = req.params.resource;
    if (resource == 'profile') { // request for profile
    
        Profile.find(null, function(err, profiles) {
            if (err) {
                res.json({
                    confirmation: 'fail...',
                    message: err
                });

                return;
            }
            
            res.json({
                confirmation: 'success',
                results: profiles
            });
        });

        return;
    }

    res.json({
        confirmation: 'fail',
        message: 'Resource ' + resource + ' not supported'
    });
});

module.exports = router;