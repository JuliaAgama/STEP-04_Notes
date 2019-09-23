// index.js
// главный файл
;
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;

const dbUrl          = process.env.MONGODB_URL || require ('./config/db').url;
const dbName         = process.env.MONGODB_DBNAME || require ('./config/db').database;
// const dbUrl          = require ('./config/db').url || process.env.MONGODB_URL;
// const dbName         = require ('./config/db').database || process.env.MONGODB_DBNAME;

const app = express();
const port = 3000;

const client = new MongoClient (dbUrl, {useNewUrlParser: true, useUnifiedTopology: true });

client.connect ((err, cluster) => {
    if (err) return console.log(err);

    require('./app/routes') (app, cluster.db(dbName));

    app.listen(port, () => {
        console.log('We are live on ', port);
    });
});

