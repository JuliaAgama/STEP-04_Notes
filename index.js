// index.js
// главный файл
;
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const dbConfig = require ('./config/db');

const app = express();
const port = 3000;

const client = new MongoClient (dbConfig.url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true }
);

client.connect ((err, connection) => {
    if (err) throw err;
    // if (err) return console.log(err);

    require('./app/routes') (
        app,
        connection.db(dbConfig.database)
    );

    app.listen(port, () => {
        console.log('We are live on ', port);
    });
});

// ниже коммент для меня (jv),
//нужно разобраться и подумать, как лучше обращаться к коллекциям - здесь общей переменной (стр.21) или каждый у себя к своей коллекции уточняет путь, а в мейн - к обеим коллекциям, а здесь в переменную записать только базу, а не коллекции....
// Еще:  возможно, проще в одну коллекцию запихнуть оба типа заметок....:
// client.connect ((err, database) => {
//     require('./app/routes') (app, database);