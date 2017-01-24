import compression from 'compression';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import api from './api';

// Middleware
import { isAuthed } from './middleware/session';

// Environment Variables
import env from 'node-env-file';
env(path.join(__dirname, '..', '.env'));

const PORT = process.env.PORT || 8102;

const app = express()
  .use(compression())
  .use(morgan('tiny'))
  .use(bodyParser.urlencoded({
    extended: true,
    limit: '20mb'
  }))
  .use(bodyParser.json({limit: '20mb'}))
  .use(cookieParser());

// Allow external calls to API.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.BASE_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("X-Frame-Options", "deny");
  next();
});

// REST API
app.use('/api', api);

// Session check
app.use('/', isAuthed, (req, res, next) => {
  if ( req.path == '/') console.log(req.userData);
  next();
});

// UI
app.use('/', express.static(path.join(__dirname, '/../dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '/../dist/index.html')));
});

const server = http.createServer(app);
server.listen(PORT);

console.log(`Server started, listening at port ${PORT}`);
