// app/routes/main/index.js
// маршруты к главной странице "/"
;
// const express = require('express');
// const router = express.Router();
// const ObjectID = require('mongodb').ObjectID;

const jsonHandler = require('../../services/jsonHandler');
const getAllData = require('./getAllData');


const dbCollections = require ('../../../config/db').collections;

module.exports = function (app, database) {

    app.set('view engine', 'pug');
    app.set('views', './app/views');

    app.route('/')
    .get((req, res) => {

        getAllData(dbCollections, database)
        .then(items => {
            console.log(items.length);

            res
                // .status(200)
                .render('index')
                // .send(items);
                // .end()
            // res.end()
        })
        .catch(err => {
            res.status(400).send(jsonHandler.createResponse(() => {
                throw new Error(err);
            }));
        });
    })
};
