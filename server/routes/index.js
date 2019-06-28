'use strict';

const UserController = require('../controllers/user.server.controller');

module.exports = function(app) {
  app.route('/api/admin/login').post(UserController.login);
  app.route('/api/admin/logout').post(UserController.logout);
  app.route('/api/user/login').post(UserController.login);
  app.route('/api/user/search').post(UserController.searchUsers);
  app.route('/api/user').post(UserController.createUser);
  app.route('/api/user/resetPassword').post(UserController.resetPassword);
  app.route('/api/user/:id').delete(UserController.deleteUser);
  app.route('/api/user/:id').put(UserController.editUser);
  app.route('/api/user/isExist').get(UserController.isExistUserByUserId);
  app.route('/api/admin/info').get(UserController.adminInfo);
  app.route('/api/user/count').get(UserController.userCount);
  app.route('/api/user/checkSession').get(UserController.checkSession);
};
