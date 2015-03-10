'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  relationship = require("mongoose-relationship"),
  autoIncrement = require('mongoose-autoinc');

var AccountSchema = new Schema({
  owner: {type: Number, ref: 'Guest', childPath:'account'},
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  salt: String
});

/**
 * Virtuals
 */
AccountSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
AccountSchema
  .virtual('profile')
  .get(function() {
    return {
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
AccountSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate empty email
AccountSchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
AccountSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
AccountSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, account) {
      if(err) throw err;
      if(account) {
        if(self.id === account.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
  }, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
AccountSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();
    if (!validatePresenceOf(this.hashedPassword))
      next(new Error('Invalid password'));
    else
      next();
  });

/**
 * Methods
 */
AccountSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

AccountSchema.plugin(relationship, {relationshipPathName: 'owner'});
AccountSchema.plugin(autoIncrement.plugin, { model: 'Account', startAt: '1' , incrementBy: '1'});
module.exports = mongoose.model('Account', AccountSchema);
