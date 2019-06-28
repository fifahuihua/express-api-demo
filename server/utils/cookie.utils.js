var SESSION_ID_COOKIE_KEY = 'MEVN_STACK_SID';
var SESSION_ID_EXPIRATION_AGE = 3 * 60 * 60 * 1000; // 3 hours.

var getSessionId = function (req) {
    return req.cookies[SESSION_ID_COOKIE_KEY];
  };
  
  var clearSessionId = function(res) {
    res.cookie(SESSION_ID_COOKIE_KEY, null, { maxAge: 0 });
  };
  
  var resetSessionIdExpiredTime = function(req, res, sessionId) {
    if (sessionId && sessionId !== '') {
      res.cookie(SESSION_ID_COOKIE_KEY, sessionId, { maxAge: SESSION_ID_EXPIRATION_AGE });
    }
  };

  module.exports = {
    getSessionId, clearSessionId, resetSessionIdExpiredTime, SESSION_ID_COOKIE_KEY, SESSION_ID_EXPIRATION_AGE
  }
