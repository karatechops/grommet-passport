import express from 'express';
import path from 'path';
import Passport from './Passport';
import { flattenUser } from './Passport/utils';

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
          return res.status(200).send({
            user: flattenUser(data),
            sessionId
          });
        })
        .catch((err) => 
          res.status(400).send({ error: err })
        );
    })
    .catch((err) => {
      console.log('login error:', err);
      return res.status(400).send({ error: err });
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
          console.log('logged in', sessionId, data);
          return res.status(200).send({
            ...data,
            sessionId
          });
        })
        .catch((err) => {
          console.log('login error:', err);
          return res.status(400).send({ error: err });
        });

      //console.log('passport response:', data);
      //return res.status(400).send(data);
    })
    .catch((err) => {
      console.log('create user error:', err);
      return res.status(400).send({ error: err});
    });
});

router.get('/user/security-questions', (req, res) => {
  passport.getSecurityQuestions()
    .then((data) => {
      return res.status(200).send({ data });
    })
    .catch((err) => {
      console.log('security question error:', err);
      return res.status(400).send({ error: err });
    });
});

router.post('/user/forgot-id', (req, res) => {
  const email = req.body.email;

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
          console.log('send email error:', err);
          return res.status(400).send({error: err});
        });
    }).catch((err) => {
      console.log('get user id error:', err);
      return res.status(400).send({ error: err });
    });;
});

export default router;
