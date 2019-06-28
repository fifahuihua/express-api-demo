'use strict';

const mongoose = require('mongoose');
const path = require('path');
const _ = require('lodash');
const FileUtil = require('../../server/utils/file.server.util');

const config = require('./config')[process.env.NODE_ENV];

exports.init = async function () {
  console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}, config: ${JSON.stringify(config)}`);
  let options = _.get(config.db, 'options', {});
  let uri = config.db.uri;

  mongoose.connection.on('error', function () {
    console.error(`[Mongoose] failed to connect to ${uri}`);
  });
  mongoose.connection.on('disconnected', function () {
    console.error(`[Mongoose] disconnect event found in ${uri}`);
  });
  mongoose.connection.on('connected', function () {
    console.log(`[Mongoose] success to connect to ${uri}`);
  });

  try {
    // mongoose.set('useCreateIndex', true);
    let dbConn = await mongoose.connect(uri, options);
    let models = FileUtil.getGlobbedPaths('./server/models/*.server.model.js');
    for (let model of models) {
      console.log(`mdole: ${model}`);
      require(path.resolve(model));
    }
    return dbConn;
  } catch (error) {
    appLogger.error("[Database Connection] Failed to connected " + uri, error);
    return null;
  }
};