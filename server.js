const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const port = 3000;
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'smart-brain'
  }
});

app.use(bodyParser.json());
app.use(cors());
app.get('/', (req,res) => {
	res.send(database.users);
})

app.post('/signin', (req,res) => {
	signin.handleSignIn(req, res, db, bcrypt);
})

app.post('/register', (req,res) => {
	register.handleRegister(req, res, db, bcrypt);	
})

app.post('/profile/:id', (req,res) => {
	profile.handleProfile(req, res, db);
})

app.put('/image', (req, res) => {
	image.handleImage(req, res, db);
})

app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res);
})

app.listen(port, () => {
	console.log(`Listening at port: ${port}`);
})