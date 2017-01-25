import Passport from '../Passport';
import path from 'path';
import env from 'node-env-file';
env(path.join(__dirname, '../..', '.env'));

// Instantiate the Passport utility.
const passport = new Passport({
  url: process.env.PASSPORT_URL,
  username: process.env.PASSPORT_USER,
  password: process.env.PASSPORT_PASSWORD,
  appId: process.env.PASSPORT_APP_ID
});

export function isAuthed(req, res, next) {
  // Get cookie session IDs.
  const sessionId = (req.cookies.GPsessionId || req.cookies.HPPSESSION)
    ? req.cookies.HPPSESSION || GPsessionId
    : undefined;

  if (sessionId) {
    passport.validateSession(sessionId)
      .then((userId) => {
        passport.userDetails(sessionId)
          .then((user) => {
            // Add user data to request to fill initial state.
            req.userData = user;
            req.sessionId = sessionId;

            return next();
          })
          .catch((err) => 
            res.status(400).send({ error: err })
          );
      })
      .catch((err) => {
        // Session is not valid, proceed as usual.
        // console.log('session validation error:', err);
        return next();
      });
  } else {
    // The user's session has not validated, forward to login page.
    res.redirect('/');
  }
}
