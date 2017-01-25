import express from 'express';
import path from 'path';
import Passport from './Passport';

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
          return res.status(200).send(data);
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

router.get('/user/security-questions', (req, res) => {
  passport.getSecurityQuestions()
    .then((data) => {
      return res.status(200).send({ data });
    })
    .catch((err) => {
      cosole.log('security question error:', err);
      return res.status(400).send({ error: err });
    });
});

export default router;
