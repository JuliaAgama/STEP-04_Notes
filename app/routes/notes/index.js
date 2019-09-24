// app/routes/notes/index.js
// настройка маршрута к заметке 1го типа:
// - карточка с названием (опционально) и текстом
;

// app/routes/main/index.js
// маршруты к главной странице "/"

const express = require('express');
const bodyParser = require('body-parser');
const assert = require('assert');
const path = require('path');
const mongodb = require('mongodb');
const ObjectID = require('mongodb').ObjectID;

const collectionHandler = require('../../services/collectionHandler');



// const router = express.Router();
// const ObjectID = require('mongodb').ObjectID;


module.exports.notes = function (app, database) { //

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static('app/public'));

    app.set('view engine', 'pug');
    app.set('views', './app/views');

    app.route('/notes')
        .get((req, res) => {
            res.render('notes')
        });
};

module.exports.notes_id = function (app, database) { //

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static('app/public'));

    app.set('view engine', 'pug');
    app.set('views', './app/views');

    app.route('/notes/:id?')
        .get((req, res) => {
            const id = req.params.id;
            const collection = database.collection('notes');

            const note = collection.find(new ObjectID(id));

            collectionHandler.createResponse(note)
                .then(items => {
                    res.render('notes_details', {
                        titleText: items[0].title,
                        noteText: items[0].description,
                        noteId: id

                    })
                })
                .catch(err => {
                    res.status(400).send(jsonHandler.createResponse(() => {
                        throw new Error(err);
                    }));
                });
        });
};


module.exports.api_notes = function (app, db) {

    app.use(bodyParser.json());
    app.post('/api/notes', function (req, res) {

        db.collection('notes').insertOne(req.body, (err, result) => {
            if (err) {
                res.send({'error': 'An error occured'});
            } else {
                res.redirect('/');
            }
        });
    });
};

// module.exports.api_notes = function (app, db) {
//
//     app.use(bodyParser.json());
//     app.put('/api/notes/:id?', function (req, res) {
//
//         const id = req.params.id;
//         const collection = database.collection('notes');
//         const note = collection.find(new ObjectID(id));
//
//         db.collection.update(note, {
//             title: "ondo",
//             description: "bondo"
//         });
//
//         // db.collection('notes').insertOne(req.body, (err, result) => {
//         //     if (err) {
//         //         res.send({'error': 'An error occured'});
//         //     } else {
//         //         res.redirect('/');
//         //     }
//         // });
//     });
// };