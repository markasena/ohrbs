'use strict';


var Account = require('./account.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  Account.find({}, '-salt -hashedPassword')
    .populate('owner')
    .exec(function (err, accounts) {
      if(err) return res.send(500, err);
      res.status(200).json(accounts);
    });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new Account(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, account) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: account._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;
  Account.findById(userId)
    .populate('owner').exec(function (err, account) {
      if (err) return next(err);
      if (!account) return res.send(401);
      res.json(account.profile);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  Account.findByIdAndRemove(req.params.id, function(err, account) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, account) {
  var userId = req.account._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);
  Account.findById(userId, function (err, account) {
    if(account.authenticate(oldPass)) {
      account.password = newPass;
      account.save(function(err) {
        if (err) return validationError(res, account);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  Account.findOne({
    _id: userId
  }, '-salt -hashedPassword').populate('owner')
    .exec(function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
