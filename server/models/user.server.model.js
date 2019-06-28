'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
  {
    displayName: String,
    username: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: ''
    },
    password: {
      type: String,
      required: true
    },
    salt: {
      type: String
    },
    address: String,
    phoneNumber: String,
    depart: String,
    desc: String
  },
  {
    timestamps: true
  }
);

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'sha1').toString('base64');
  } else {
    return password;
  }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

mongoose.model('User', UserSchema);
