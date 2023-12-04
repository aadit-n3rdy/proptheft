const users = require('./queries/db_users')
const uauth = require('./middleware/userauth')

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.json({info: "base api"})
})
app.get('/allusers', users.getAllUsers);
app.get('/admins', users.getAdmins);
app.get('/users', users.getUsers);
app.post('/hash', users.getHashing);
app.post('/signup', uauth.signUp);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
})

