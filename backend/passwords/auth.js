const secret = require('../config-data/secret.json')

const bcrypt = require('bcrypt');

async function genHash(pass) {
  return bcrypt.hash(pass, secret.saltRounds)
}

async function verifyPassHash(pass, hash) {
  return await bcrypt.compare(pass, hash) 
}

module.exports.genHash = genHash;
module.exports.verifyPassHash = verifyPassHash;
