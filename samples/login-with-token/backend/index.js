var express = require('express')
  , fetch = require('node-fetch')
  , path = require('path')
  , passport = require('passport')
  , BearerStrategy = require('passport-http-bearer').Strategy
  , session = require("express-session")
  , bodyParser = require("body-parser")
  // For demo purpose, provide a mocked db to handle user
  , User = require('./users')
  , middlewares = require('./middlewares')
  , credentials = require('./credentials');
;

// Demo is based on express node server
const app = express();

const {
  SECRET_KEY
} = process.env;

//////////////////////////////////////////////////////////////////////
//
// STEP 1. provide passport urls to interface with openid connect
// 
//////////////////////////////////////////////////////////////////////

// oauth2 api : /auth/provider redirect to the idp login page, 
// then back to IDP_URL_CALLBACK with authorization code value  
app.get('/auth/', function(req, res, next) {

  const cloudhost = req.headers['cloudhost'];
  const account = req.headers['account'];
  const company = req.headers['companyid'];
  const user_id = req.headers['userid'];

  if (!credentials.client_credentials[cloudhost] || 
      !credentials.client_credentials[cloudhost][account]) {
    return res.status(404).send({});
  } else {
    const credential = credentials.client_credentials[cloudhost][account];
    const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
    fetch(`https://${cloudhost}/api/oauth2/v1/check_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${credential.client_id}:${credential.client_secret}`, 'utf-8').toString('base64')}`,
        'X-Client-ID': `login-with-token`,
        'X-Client-Version': `1.0.0`
      },
      body: toUrlEncoded({ token: `${req.headers['authorization'].substr(7)}` })
    })
    .then(response => response.json())
    .then(json => {

      if (`${json.user_id}` === `${user_id}`) {

        const user = {
          id: user_id,
          cluster_url: cloudhost,
          account: account,
          companyId: company,
          user_name: json.user_name,
        };

        User.findOrCreate(user, function(err, userObject, token) {
          // return err ? next(err) : res.json({ token });
          return res.status(200).send({ token });
        });

      } else {
        return res.status(401).send({ message: 'Token does not match with provided user' });
      }
    });
  }
});

// Configure
app.post(
  '/configure/', 
  bodyParser.urlencoded({ extended: false }), 
  function(req, res, next) {

    const cloudhost = req.body['cloudHost'];
    const account = req.body['account'];
    const clientId = req.body['clientId'];
    const clientSecret = req.body['clientSecret'];

    credentials.add_configuration(cloudhost, account, {
      client_id: clientId,
      client_secret: clientSecret
    });

    return res.status(200).send({});
  });

//////////////////////////////////////////////////////////////////////
//
// STEP 2. Create a bearer token to protect extensions' API 
//
//////////////////////////////////////////////////////////////////////

// Passport fetch user from Bearer token
passport.use(new BearerStrategy(
  function(token, done) {
    User.findByToken(token, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'read' });
    });
  }
));

//////////////////////////////////////////////////////////////////////
//
// STEP 3. Create protected REST API
//
//////////////////////////////////////////////////////////////////////

// //  Return user object based on the bearer Token
app.get('/api/me',
  middlewares.authenticate,
  function(req, res) {
    // middlewares.authenticate populate req with req.user, req.access_token
    res.json(req.user);
  });

//////////////////////////////////////////////////////////////////////
//
// STEP 4. Initialise express node server to listen http request.
//
//////////////////////////////////////////////////////////////////////
app.use(session({ secret: SECRET_KEY, resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

exports.initialize = () => app;