const oauth = require('./oauth');
const passport = require('passport');

const authenticate = (req, res, next) => {
  passport.authenticate('bearer', { session: false })(req, res, async () => {
    if (req.user) {
      if (!req.headers['cloudhost']) return res.status(401).send({ message: 'Missing cloudHost header' });
      req.cluster_url = req.headers['cloudhost'];
      if (!req.headers['account']) return res.status(401).send({ message: 'Missing account header' });
      req.account = req.headers['account'];
      if (!req.headers['userid']) return res.status(401).send({ message: 'Missing userId header' });
      req.userId = req.headers['userid'];
      if (!req.headers['companyid']) return res.status(401).send({ message: 'Missing companyId header' });
      req.companyId = req.headers['companyid'];

      if (req.user.cluster_url != req.cluster_url ||
          req.user.account != req.account ||
          req.user.id != req.userId) {
        return res.status(401).send({ message: 'Shell user do not match the token user' });
      } else {
        try {
          req.access_token = await oauth.fetch(req.headers['cloudhost'], req.headers['account']);
        } catch (e) {
          return res.status(401).send({ message: e.message });
        }
      }
    } else {
     return res.status(401).send({ message: 'Bearer token unknown from the extension' });
    }
    next();
  });
};


exports.authenticate = authenticate;