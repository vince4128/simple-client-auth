const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

//config.js should be :
/*
module.exports = {
    secret : 'random string'
};
*/

const app = express();
const router = require('./router');

// DB Setup
mongoose.Promise = global.Promise;
app.use(cors());
mongoose.connect('mongodb://127.0.0.1/auth?connectTimeoutMS=5000').then(
    () => {console.log("connecté à la base de donnée !")},
    err => console.log("erreur de connexion à la base de donnée ", err.message)
);

// App Setup
app.use(morgan('combined'));// log
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on : ', port);