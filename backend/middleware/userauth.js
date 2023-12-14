const pass = require('../passwords/auth');
const pool = require('../pool/db');

/* queries */
loginText = 'SELECT u_passhash FROM db_user WHERE u_email = $1';
signupText = 'UPDATE db_user SET u_passhash = $1 WHERE u_email = $2';

const login = async (req, res) => {
  const response = await pool.query(loginText, [req.body.mail]);

  const log = await pass.verifyPassHash(req.body.pass, response.rows[0].u_passhash);

  if(log) {
    res.status(200);
    res.send({msg: "authenticated"});
  } else {
    res.status(401);
    res.send({msg: "failed authentication"});
  }
}

const signUp = async (req, res) => {
  console.log("inside")
  console.log(req.query)
  const hash = await pass.genHash(req.body.pass)
  const response = await pool.query(signupText, [hash,req.body.mail]);
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
