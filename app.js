const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const app = express();
//const mongo = require('mongodb');
const config = require('./config.js');
//const client = new mongo.MongoClient(config.db, { useNewUrlParser: true });
const index = require('./routes/index.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.set('view engine', 'pug');
app.listen(process.env.PORT, 'git.heroku.com/strefafutbolu.git', () => {
    console.log("Serwer wystartował...");
})
console.log(process);
//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cookieSession({
    name: 'session',
    keys: config.keySession,
    maxAge: config.maxAgeSession
}))
app.use(cookieParser());
index(app);
app.use(express.static(path.join(__dirname, 'public')));