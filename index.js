// index.js
// главный файл
;
const express        = require('express');
// const bodyParser     = require('body-parser');
const MongoClient    = require('mongodb').MongoClient;

// смотри пример конфига здесь: config/dbTemplate.js
const dbUrl          = require ('./config/db').url;
const dbName         = require ('./config/db').database;

const app = express();
const port = 3000;

const client = new MongoClient (dbUrl, {useNewUrlParser: true, useUnifiedTopology: true });

client.connect ((err, cluster) => {
    // if (err) throw err;
    if (err) return console.log(err);

    require('./app/routes') (app, cluster.db(dbName));

    app.listen(port, () => {
        console.log('We are live on ', port);
    });
});

