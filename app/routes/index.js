// app/routes/index.js
// собираем маршруты в одном файле
;
// const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes_main = require('./main');
const routes_notes = require('./notes');
const routes_lists = require('./lists');

module.exports = function (app, database) {

    app.use(cors());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}));

    // app.set('view engine', 'pug');
    // app.set('views', './views');

    app.use('/', routes_main(database));

    app.use('/notes', routes_notes.notes(database));
    app.use('api/notes', routes_notes.api_notes(database));

    app.use('/lists', routes_lists.lists(database));
    app.use('api/lists', routes_lists.api_lists(database));
};
