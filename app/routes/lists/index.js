// app/routes/lists/index.js
// настройка маршрута к заметке 2го типа:
;

const express        = require('express');
const bodyParser     = require('body-parser');
const assert         = require('assert');
const ObjectId       = require('mongodb').ObjectID;

module.exports.lists = function (app, db){

    app.use(express.static('app/public'));

    app.set('view engine', 'pug');
    app.set('views', './app/views');

    app.route('/lists/:id?')
    .get(async (req, res) => {
        if (req.params.id !== undefined) {
            try {
            const obj = await db.collection('lists').findOne(ObjectId(req.params.id));
            let {title = '', tasks = [], _id} = obj || {};
            res.render('list_details', {title: title, tasksArr: tasks, id: _id})
            } catch (err) {
                console.log(err.stack);
                throw new Error('BROKEN');
            }
        } else res.render('lists')
    })
};

module.exports.api_lists = function (app, db) {

    app.use(bodyParser.json());

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
};

module.exports.list_id = function(app, db) {

    app.use(bodyParser.json());

    app.route('/api/lists/:id')
    .put(async (req, res) => {
        try {
            let r = await db.collection('lists').replaceOne({_id: ObjectId(req.params.id)}, {$set: req.body});
            assert.equal(1, r.matchedCount);
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

