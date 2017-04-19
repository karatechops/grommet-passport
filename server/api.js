import express from 'express';
import path from 'path';
import Passport from './Passport';
import { debug, flattenUser, flattenTokenUser } from './Passport/utils';

// Environment variables.
// We import these here as well as server.js to make sure we 
// have the variables in process.env. without this the 
// Passport variables will return undefined.
import env from 'node-env-file';
env(path.join(__dirname, '..', '.env'));

const router = express.Router();

// Instantiate our Passport utility.
const passport = new Passport({
  url: process.env.PASSPORT_URL,
  username: process.env.PASSPORT_USER,
  password: process.env.PASSPORT_PASSWORD,
  appId: process.env.PASSPORT_APP_ID
});

// Basic test to check API functionality is sound.
router.get('/ping', (req, res) => {
  res.status(200).send('pong!');
});

// Login request
router.post('/user/login', (req, res) => {
  const reqCreds = {
    username: req.body.username,
    password: req.body.password
  };

  passport.userLogin(reqCreds)
    .then((sessionId) => {
      passport.userDetails(sessionId)
        .then((data) => {
          const user = flattenUser(data);
          passport.getRememberMeCookie(sessionId, user.profileId)
          .then((rememberMe) => {
            res.status(200).send({
              user,
              sessionId,
              rememberMe
            });
          })
          .catch((err) => {
            res.status(200).send({
              user,
              sessionId
            });
          });
        })
        .catch((err) => 
          res.status(400).send({ error: err })
        );
    })
    .catch((err) => {
      debug('login error:', err);
      return res.status(400).send({ error: err });
    });
});

// Validate User's session 
router.post('/user/session', (req, res) => {
  const { sessionId, rememberMe } = req.body;
  const decodedSessionId = decodeURIComponent(sessionId);

  passport.getRememberMeData(rememberMe)
  .then((data) => {
    res.status(200).send({
      user: flattenTokenUser(data),
      sessionId,
      rememberMe
    });
  })
  .catch((err) => {
    // Remember me session is not valid, try Passport.
    debug('session validation error:', err);
    passport.validateSession(decodedSessionId)
    .then((userId) => {
      passport.userDetails(decodedSessionId)
        .then((data) => {
          const user = flattenUser(data);
          passport.getRememberMeCookie(sessionId, user.profileId)
          .then((rememberMe) => {
            res.status(200).send({
              user,
              sessionId,
              rememberMe
            });
          })
          .catch((err) => {
            res.status(200).send({
              user,
              sessionId
            });
          });
        })
        .catch((err) => {
          debug('user details error:', err);
          return res.status(400).send({ error: err });
        });
    })
    .catch((err) => {
      // Session is not valid.
      debug('session validation error:', err);
      return res.status(400).send({ error: err });
    });
  });
});

// Create user
router.post('/user/create', (req, res) => {
  passport.userCreate(req.body)
    .then((data) => {
      const reqCreds = {
        username: req.body.userId,
        password: req.body.password
      };
      passport.userLogin(reqCreds)
        .then((sessionId) => {
          debug('logged in', sessionId, data);
          return res.status(200).send({
            ...data,
            sessionId
          });
        })
        .catch((err) => {
          debug('login error:', err);
          return res.status(400).send({ error: err });
        });
    })
    .catch((err) => {
      debug('create user error:', err);
      return res.status(400).send({ error: err});
    });
});

// Check if user ID exists.
router.post('/user/check-id', (req, res) => {
  passport.checkUserId(req.body.userId)
  .then((data) => res.status(200).send({ data: data }))
  .catch((err) => res.status(400).send({ error: err }));
});

// Create user
router.post('/sponsored-user/create', (req, res) => {
  passport.userCreate(req.body)
    .then((data) => {
      debug('sponsored user:', data);
      return res.status(200).send(data);
    })
    .catch((err) => {
      debug('create sponsored user error:', err);
      return res.status(400).send({ error: err});
    });
});

router.get('/user/security-questions', (req, res) => {
  passport.getSecurityQuestions()
    .then((data) => {
      return res.status(200).send({ data });
    })
    .catch((err) => {
      debug('security question error:', err);
      return res.status(400).send({ error: err });
    });
});

router.post('/user/forgot-id', (req, res) => {
  const email = req.body.emailAddress;

  passport.getUserId(email)
    .then((userId) => {
      // Passport API uses $userId$ to insert the user's ID.
      const msg = {
        to: email,
        from: 'passport@hpe.com',
        replyTo: 'passport@hpe.com',
        subject: 'Passport - User ID Recovery',
        body: 'Here\'s your requested user ID: $userId$'
      };

      passport.sendEmail(msg, userId)
        .then((data) => {
          return res.status(200).send({ data });
        })
        .catch((err) =>{
          debug('send email error:', err);
          return res.status(400).send({error: err});
        });
    })
    .catch((err) => {
      debug('Get user id error:', err);
      return res.status(400).send({ error: err });
    });
});

// Test GUID route. To be removed...
router.get('/user/guid', (req, res) => {
  const guid = 'ff5be85b-45ea-4fc0-9d93-a0a5b303f768';
  passport.getGuidExp(guid)
    .then((data) => {
      debug('data:', data);
    })
    .catch((err) => {
      debug('GUID error:', err);
    });
});


// Send password reset link to user.
router.post('/user/forgot-password', (req, res) => {
  const email = req.body.emailAddress;
  const msg = {
    to: email,
    from: 'passport@hpe.com',
    replyTo: 'passport@hpe.com',
    subject: 'Passport - Password Reset',
    body: `Password reset link: ${process.env.BASE_URL}/forgot-password/$guid$`
  };

  passport.sendPasswordReset(msg)
    .then((data) => res.status(200).send({ data }))
    .catch((err) => {
      debug('Send password reset error:', err);
      return res.status(400).send({ error: err });
    });
});

// Email a user, used specifically for sponsored users.
router.post('/email', (req, res) => {
  const  { to, from, replyTo, subject, body } = req.body;
  const msg = {
    to,
    from,
    replyTo,
    subject,
    body
  };

  passport.getUserId(to)
    .then((userId) => {
      passport.sendEmail(msg, userId)
        .then((data) => res.status(200).send({ data }))
        .catch((err) => {
          debug('Send email error:', err);
          return res.status(400).send({ error: err });
        });
    })
    .catch((err) => res.status(400).send({error: err}));
});

// Password reset link. Validates GUID before attempting to change password.
// Default Passport GUID expiration is 7 days.
router.post('/user/reset-password', (req, res) => {
  const guid = req.body.guid;

  passport.getGuidExp(guid)
    .then((data) => {
      const user = {
        userId: data.userId,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
      };

      passport.changePassword(guid, user)
        .then((changeData) => res.status(200).send({ data: changeData }))
        .catch((err) => res.status(400).send({ error: err }));
    })
    .catch((err) => {
      debug('GUID error:', err);
      return res.status(400).send({ error: err });
    });
});

export default router;
