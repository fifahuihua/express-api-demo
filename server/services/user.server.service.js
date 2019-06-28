'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.listUsers = async function() {
  const users = await User.find({});
  return users;
};

exports.queryUsers = async function(username, skip, limit) {
  const users = await User.find({ username: { $regex: `.*${username}.*`, $options: 'i' } }, '-password -salt', {
    limit,
    skip
  });
  return users;
};

exports.getUserByUserId = async function(userId) {
  const user = await User.findOne({ username: userId });
  return user;
};

exports.countUsers = async function(username) {
  const count = await User.count({ username: { $regex: `.*${username}.*`, $options: 'i' } });
  return count;
};

exports.createUser = async function(userData) {
  const user = new User(userData);
  await user.save();
};

exports.deleteUser = async function(id) {
  await User.findByIdAndRemove({ _id: id });
};

exports.editUser = async function(id, user) {
  await User.findByIdAndUpdate({ _id: id }, user);
};

exports.resetPassword = async function(id, password) {
  const user = await User.findById(id);
  user.password = password;
  await user.save();
  // await User.findByIdAndUpdate({ _id: id }, {pa});
};
