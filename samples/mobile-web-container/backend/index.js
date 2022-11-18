var express = require('express'),
    context = require('./context');

// Demo is based on express node server
const app = express();

const {
  SECRET_KEY
} = process.env;

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

// Required for req.protocol. Otherwise req.protocol is always http because of proxy.
// [WARNING] just required because of ngrok
app.enable('trust proxy');


app.post("/web-container-access-point", function (req, res, next) {
  context.storeContext(req.body);
  res.redirect(req.protocol + '://' + req.get('host'));
});

app.get("/web-container-context", function (req, res, next) {
  var currentContext = context.getContext();

  if (currentContext === undefined) {
    return res.status(404).send({ message: 'Context from mobile web container is not available.' });
  }

  return res.json(currentContext);
});

exports.initialize = () => app;