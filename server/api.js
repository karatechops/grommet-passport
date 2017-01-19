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
  password: process.env.PASSPORT_PASSWORD
});

// Basic test to check API functionality is sound.
router.get('/ping', function(req, res) {
  res.status(200).send('pong!');
});


// Login request
router.post('/user/login', function(req, res) {
  const reqCreds = {
    username: req.body.username,
    password: req.body.password
  };

  passport.userLogin(reqCreds)
    .then((data) => {
      console.log('login data:', data);
      return res.status(200).send();
    })
    .catch((err) => {
      console.log('login error:', err);
      return res.status(400).send({ error: err });
    });
});

export default router;
