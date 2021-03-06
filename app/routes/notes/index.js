// app/routes/notes/index.js
// настройка маршрута к заметке 1го типа
;

const bodyParser        = require('body-parser');
const ObjectID          = require('mongodb').ObjectID;
const jsonHandler       = require('../../services/jsonHandler');
const collectionHandler = require('../../services/collectionHandler');


module.exports.notes = function (app, database) {

    app.route('/notes')
        .get((req, res) => {
            res.render('notes')
        });
};

module.exports.notes_id = function (app, database) {

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

module.exports.api_notes = function (app, database) {

    app.post('/api/notes', function (req, res) {
        database.collection('notes').insertOne(req.body, (err, result) => {
            if (err) {
                res.send({'error': 'An error occured'});
            } else {
                res.redirect('/');
            }
        });
    });
};

module.exports.api_notes_id = function (app, database) {
    app.use(bodyParser.json());

    app.route('/api/notes/:id?')
        .put(async( req, res) => {
            const id = req.params.id;
            const collection = database.collection('notes');
            const note = await collection.updateOne({_id: ObjectID(id)}, {$set: req.body})
                .catch(err => {
                    res.status(400).send(jsonHandler.createResponse(() => {
                        throw new Error(err);
                    }));
                });
        })
        .delete(async (req, res) => {
            const id = req.params.id;
            const collection = database.collection('notes');
            const note = await collection.deleteOne({_id: ObjectID(id)});
    })
};