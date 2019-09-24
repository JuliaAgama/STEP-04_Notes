// index.js
// главный файл
;
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const config         = require('./config')

const app = express();
const port = config.PORT;
const dbUrl = config.MONGODB_URL;
const dbName = config.MONGODB_DBNAME;

const client = new MongoClient (dbUrl, {useNewUrlParser: true, useUnifiedTopology: true });

client.connect ((err, cluster) => {
    if (err) return console.log(err);

    require('./app/routes') (app, cluster.db(dbName));

    app.listen(process.env.PORT || port, () => {
        console.log('We are live on ', port);
    });
});

