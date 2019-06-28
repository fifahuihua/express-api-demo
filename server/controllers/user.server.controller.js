'use strict';
const MockData = require('../utils/mock.data');
const CookieUtils = require('../utils/cookie.utils');
const CommonUtil = require('../utils/common.utils');
const UserService = require('../services/user.server.service');
const passport = require('passport');

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      res.status(400).send(info);
    } else {
      req.login(user, function(err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }
  })(req, res, next);
};

exports.logout = function(req, res) {
  // CookieUtils.clearSessionId(res);
  req.logout();
  return res.json({ status: 1, success: '退出成功' });
};

exports.adminInfo = function(req, res) {
  return res.json({ status: 1, data: { id: 1, name: 'test', status: 'active' } });
};

exports.deleteUser = async function(req, res) {
  const id = req.params.id;
  try {
    await UserService.deleteUser(id);
    return res.json({ result: 'success' });
  } catch (error) {
    return res.status(400).send({ result: 'error', message: '删除用户出现异常' });
  }
};

exports.editUser = async function(req, res) {
  const id = req.params.id;
  try {
    await UserService.editUser(id, req.body);
    return res.json({ result: 'success' });
  } catch (error) {
    return res.status(400).send({ result: 'error', message: '更新用户出现异常' });
  }
};

exports.resetPassword = async function(req, res) {
  const id = req.body.id;
  try {
    await UserService.resetPassword(id, req.body.password);
    return res.json({ result: 'success' });
  } catch (error) {
    return res.status(400).send({ result: 'error', message: '重置用户密码出现异常' });
  }
};

exports.userCount = async function(req, res) {
  const count = await UserService.countUsers(req.query.username || '');
  return res.json({ status: 'success', count: count });
};

exports.checkSession = function(req, res) {
  // const sessionValue = CookieUtils.getSessionId(req);
  if (req.user) {
    return res.json({ status: 'success', user: req.user });
  } else {
    return res.json({ status: 'failed' });
  }
};

exports.searchUsers = async function(req, res) {
  const username = req.body.username || '';
  const offset = req.body.offset || 0;
  const limit = req.body.limit || 20;
  return res.json(await UserService.queryUsers(username, offset, limit));
};

exports.isExistUserByUserId = async function(req, res) {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).send({ message: 'Invalid Paramter.' });
  }

  const user = await UserService.getUserByUserId(userId);
  return res.json({ result: 'success', existed: !!user });
};

exports.createUser = async function(req, res) {
  const userData = req.body;
  if (!userData.username || !userData.email || !userData.password) {
    return res.json({ status: 'failed', message: 'Invalid user data.' });
  }

  await UserService.createUser(userData);
  return res.json({ status: 'success' });
};
