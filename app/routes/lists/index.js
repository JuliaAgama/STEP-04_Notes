// app/routes/lists/index.js
// настройка маршрута к заметке 2го типа:
// - TO-DO список: название (опционально), перечень задач с чекбоксом для отметки того, что задача была выполнена.
const express        = require('express');
const bodyParser     = require('body-parser');
const assert         = require('assert');
const ObjectId       = require('mongodb').ObjectID




module.exports.lists = function (app, db){ //
    
    app.use(express.static('app/public'))

    app.set('view engine', 'pug');
    app.set('views', './app/views');

    app.route('/lists/:id?')
    .get(async (req, res) => {
        if (req.params.id !== undefined) {
            const obj = await db.collection('lists').findOne(ObjectId(req.params.id));
            let {title = '', tasks = [], _id} = obj || {};
            res.render('list_details', {title: title, tasksArr: tasks, id: _id});
        } else res.render('lists')
    })
};
    /**
    * Роут GET /lists, который будет отдавать HTML страницу с формой создания списка.
    * Роут GET /lists/${id}, который будет отдавать HTML страницу детального отображения списка.
    */


module.exports.api_lists = function (app, db) {

    app.use(bodyParser.json())
    app.route('/api/lists')
    .post(async (req, res) => {

        try {
            let r = await db.collection('lists').insertOne(req.body);
            assert.equal(1, r.insertedCount);
            res.status(201);
            res.send('List created');
        } catch (err) {
            console.log(err.stack);
            throw new Error('BROKEN');
        }
    });

    /**
    * Роут GET /api/lists/${id} отображения заметки со списком.
    * Роут POST /api/lists для добавления нового списка задач с учетом того, что количество позиций в списке - не ограничено и заранее не известно.
    * Роут PUT /api/lists/${id} для редактирования списка задач.
    * Роут DELETE /api/lists/${id} для удаления заметки со списком.
    */

};

module.exports.list_id = function(app, db) {
    app.use(bodyParser.json());
    app.route('/api/lists/:id')
    .put(async (req, res) => {
        try {
            let r = await db.collection('lists').replaceOne({_id: ObjectId(req.params.id)}, {$set: req.body});
            assert.equal(1, r.matchedCount);
            // assert.equal(1, r.modifiedCount); if nothing is modified r.modifiedCount is 0
            res.status(200);
            res.send('List updated');
        } catch (err) {
            console.log(err.stack);
            throw new Error('BROKEN');
        }
    })
    .delete(async (req, res) => {
        try {
            let r = await db.collection('lists').deleteOne({_id: ObjectId(req.params.id)});
            assert.equal(1, r.deletedCount);
            res.status(204);
            res.send('List deleted');
        } catch (err) {
            console.log(err.stack);
            throw new Error('BROKEN');
        }
    })
    .get(async (req, res) => {
        try {
            let r = await db.collection('lists').findOne(ObjectId(req.params.id));
            res.status(200);
            res.send(r);
        } catch (err) {
            console.log(err.stack);
            throw new Error('BROKEN');
        }
    })
};


// app/routes/main/index.js
// маршруты к главной странице "/"

// const router = express.Router();
// const ObjectID = require('mongodb').ObjectID;

    
