const pass = require('../passwords/auth');
const pool = require('../pool/db');

/* queries */
loginText = 'SELECT passhash FROM db_user WHERE u_email = $1';
signupText = 'UPDATE db_user SET passhash = $1 WHERE u_email = $2';

const login = async (req, res) => {
  const response = await pool.query(loginText, [req.query.mail]);
  if(!pass.verifyPassHash(pass,response)) {
    res.status(404);
    res.send({err: "Wrong password"});
  } else {
    res.status(200);
    res.send({msg: "Correct password"});
  }
}

const signUp = async (req, res) => {
  console.log("inside")
  console.log(req.query)
  const hash = await pass.genHash(req.query.pass)
  const response = await pool.query(signupText, [hash,req.query.mail]);
  console.log(response)
  if(response.rowCount == 0) {
    res.status(404)
    res.send({msg: "Wrong email"});
  } else {
    res.status(200)
    res.send({msg: "Signed in"})
  }
}

module.exports = {
  login,
  signUp
}
