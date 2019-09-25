// app/routes/main/index.js
// маршруты к главной странице "/"
;

const express     = require('express');
const jsonHandler = require('../../services/jsonHandler');
const getAllData  = require('./getAllData');


module.exports = function (app, database) {

    app.use(express.static('app/public'))
    app.set('view engine', 'pug');
    app.set('views', './app/views');

    app.route('/')
    .get((req, res) => {
        getAllData(database)
        .then(items => {
            res.render('index', {items: items})
        })
        .catch(err => {
            res.status(400).send(jsonHandler.createResponse(() => {
                throw new Error(err);
            }));
        });
    })
};
