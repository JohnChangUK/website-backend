var Profile = require('../models/Profile');
var Promise = require('bluebird');

module.exports = {

    get: function(params) {
        
        return new Promise(function(resolve, reject) {
            Profile.find(params, function(err, profiles) {
                if (err) {
                    reject(err);
                    return;
                }

                var results = [];
                profiles.forEach(function(profile, i) {
                    results.push(profile.summary());
                });

                resolve(results);
            });
        });
    },

    getById: function(id) {
        return new Promise(function(resolve, reject) {
            Profile.findById(id, function(err, profile) {
                if (err) {
                    reject(new Error('Profile not Found!'));
                    return;
                }

                if (profile == null) {
                    reject(new Error('Profile not found'));
                    return;
                }

                resolve(profile.summary());
            });
        });
    },

    post: function(body) {
        return new Promise(function(resolve, reject) {
            Profile.create(body, function(err, profile) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(profile.summary());
            });
        });
    }
};