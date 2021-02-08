const { v4: uuidv4 } = require('uuid');

// Mocked API from backend framework to access user data model
// Store user on node session using users dictionnary.
// Export functions as commonjs syntax to be work with require()
// API is based on passportjs.org sample code : http://www.passportjs.org/docs/

const users = {};
const tokens = {};

function findOrCreate(_user, callback) {
  const { cluster_url, account, id } = _user;

  let user = Object.values(users).find(storedUser => {
    return storedUser.cluster_url == cluster_url &&
           storedUser.account == account &&
           storedUser.id == id;
  });

  if (!user) {
    const uuid = uuidv4();
    users[uuid] = Object.assign({}, _user, { uuid });
    user = users[uuid];
  }

  const token =  uuidv4();
  tokens[token] = user.uuid;

  callback(null, user, token);
}

function findById(uuid, callback) {
  callback(null, users[uuid]);
}

function findByToken(token, callback) {
  const uuid = tokens[token];
  if (uuid && users[uuid]) {
    callback(null, users[uuid]);
  } else {
    callback('unknown token', false);
  }
}

exports.findOrCreate = findOrCreate;
exports.findById = findById;
exports.findByToken = findByToken;