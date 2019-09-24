// app/routes/index.js
// собираем маршруты в одном файле
;

// const express        = require('express');

const cors           = require('cors');
const bodyParser     = require('body-parser');

const routes_main    = require('./main/');
const routes_notes   = require('./notes/');
const routes_lists   = require('./lists/');

module.exports = function (app, database) {

    app.use(cors());
    // app.use(bodyParser.json())
    // app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.urlencoded({extended: true}));


    // app.set('view engine', 'pug');
    // app.set('views', './app/views/');

    routes_main(app, database);
    // app.use('/', routes_main(database));

    routes_notes.notes(app, database);
    routes_notes.api_notes(app, database);

    routes_lists.lists(app, database);
    routes_lists.api_lists(app, database);
};
