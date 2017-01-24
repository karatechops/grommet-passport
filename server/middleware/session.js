import Passport from '../Passport';
import path from 'path';
import env from 'node-env-file';
env(path.join(__dirname, '../..', '.env'));

// Instantiate our Passport utility.
const passport = new Passport({
  url: process.env.PASSPORT_URL,
  username: process.env.PASSPORT_USER,
  password: process.env.PASSPORT_PASSWORD,
  appId: process.env.PASSPORT_APP_ID
});

export function isAuthed(req, res, next) {
  const sessionId = (req.cookies.GPsessionId || req.cookies.HPPSESSION)
    ? req.cookies.HPPSESSION || GPsessionId
    : undefined;

  if (req.path == '/' && sessionId) {
    passport.validateSession(sessionId)
      .then((userId) => {
        passport.userDetails(sessionId)
          .then((user) => {
            req.userData = user;
            console.log('req', req.userData);
            return next();
          })
          .catch((err) => 
            res.status(400).send({ error: err })
          );
      })
      .catch((err) => {
        console.log('session validation error:', err);
        return next();
      });
    //res.redirect('/dashboard');
  } else {
    next();
  }
}
