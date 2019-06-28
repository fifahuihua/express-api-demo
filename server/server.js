require('./configs/check-versions')();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

let server;
const dbConn = require('./configs/dbConn');
const config = require('./configs/config')[process.env.NODE_ENV];

var readyPromise = new Promise((resolve) => { });

const startApp = async function() {
  let dbConnection = await dbConn.init();

  // default port where dev server listens for incoming traffic
  var port = process.env.PORT || config.port;
  var app = express();
  const isDevelopmentEnv = process.env.NODE_ENV === 'development';

  if (isDevelopmentEnv) {
    app.use(morgan('dev'));
  } else {
    app.use(compression());
  }

  app.use(
    bodyParser.urlencoded({
      extended: true,
      parameterLimit: 20000,
      limit: 1024 * 1024 * 2
    })
  );

  app.use(
    bodyParser.json({
      extended: true,
      parameterLimit: 20000,
      limit: 1024 * 1024 * 2
    })
  );

  var mongoStore = new MongoStore({
    mongooseConnection: dbConnection,
    url: 'mongodb://localhost:27017/mevn-stack',
    touchAfter: 24 * 3600, // Updating the session only every 24 hours.
    autoRemove: 'interval',
    autoRemoveInterval: 30 // Removing expired sessions every 30 minutes.
  });

  // Configure the 'session' middleware
  app.use(
    session({
      name: 'MEVN_STACK_SID',
      saveUninitialized: false, // don't create session until something stored
      resave: false, // don't save session if unmodified
      secret: 'mevn-stack-session-secret',
      cookie: {
        maxAge: 1000 * 60 * 60 * 2
      },
      store: mongoStore
    })
  );

  app.use(flash());
  require('../server/configs/passport.config')(app);
  app.use(cookieParser());

  require('../server/routes')(app);

  server = app.listen(port);
  console.log(`> Listening at port: ${port}\n`);
};

startApp();

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  }
};
