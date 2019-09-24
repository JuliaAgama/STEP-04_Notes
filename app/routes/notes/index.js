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

    /**
     * Роут GET /notes, который будет отдавать HTML страницу с формой создания заметки.
     * Роут GET /notes/${id}, который будет отдавать HTML страницу детального отображения заметки.
     */

};

// module.exports.api_notes = function (db) {
//
//     /**
//      * Роут POST /api/notes для создания заметки.
//      * Роут PUT /api/notes/${id} для редактирования заметки.
//      * Роут DELETE /api/notes/${id} для удаления заметки.
//      */
//
// };

module.exports.api_notes = function (app, db) {

    app.use(bodyParser.json());
    app.post('/api/notes', async function (req, res) {
        
        try {
            let insertedNote = await db.collection('notes').insertOne(req.body);
            assert.equal(1, insertedNote.insertedCount);
            res.status(201);
            // res.send('Note created');
            res.redirect('/')
            // res.redirect('/')
        }
        
        catch (err) {
            console.log(err);
        }
        
       
    });
};