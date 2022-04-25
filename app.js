const express = require('express');
const http = require('http');
const https = require('https');
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
http.createServer(app).listen(process.env.PORT);
https.createServer(app).listen();
//app.listen(process.env.PORT, () => {
//console.log("Serwer wystartował...");
//})
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