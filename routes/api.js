var express = require('express');
var router = express.Router();
// var Profile = require('../models/Profile');
var controllers = require('../controllers');

router.post('/:resource', function(req, res, next) {
    var resource = req.params.resource;
    var controller = controllers[resource];
    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Resource ' + resource + ' not supported'
        });
        return;
    }

    var formData = req.body;
    controller
    .post(formData)
    .then(function(result) {
        res.json({
            confirmation: 'success',
            result: result
        });
    })
    .catch(function(err) {
        res.json({
            confirmation: 'fail',
            message: err.message
        });
    });
});

router.get('/:resource', function(req, res, next) {
    var resource = req.params.resource;
    var controller = controllers[resource];
    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Resource ' + resource + ' not supported'
        });
        return;
    }

    controller
    .get(null)
    .then(function(results) {
        res.json({
            confirmation: 'success',
            results: results
        });

    })
    .catch(function(err) {
        res.json({
            confirmation: 'fail',
            message: err
        });
    });
});

router.get('/:resource/:id', function(req, res, next) {
    var resource = req.params.resource;
    var controller = controllers[resource];
    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Resource ' + resource + ' not supported'
        });
        return;
    }

    var id = req.params.id;
    controller
    .getById(id)
    .then(function(result) {
        res.json({
            confirmation: 'success',
            result: result
        });
    })
    .catch(function(err) {
        res.json({
            confirmation: 'fail',
            message: err.message
        });
    });
});

module.exports = router;