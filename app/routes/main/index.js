// app/routes/main/index.js
// маршруты к главной странице "/"
;
const express = require('express');
const router = express.Router();



// module.exports = function (app, client) {
//     let db = client.db('sample-notes-general');


//     app.route('/notes')
//     // .get((req, res) => {
//     // })
//     .post((req, res) => {
//         // создаем заметку:
//         const note = {title: req.body.title, description: req.body.description, checkList: req.body.checklist}

//         //отправляем заметку в монгодб:
//         db.collection('notes').insertOne(note, (err, result) => {
//             if (err) {
//                 res.send({ 'error': 'OOOPS... An error has occurred with MongoDB collection "sample-notes-general"' });
//             } else {
//                 res.send(result.ops[0]);
//             }
//         });
    });


    // app.route('/notes/:id')
    // .get((req, res) => {
    //     const details = {'_id: ' /**тут будет id */}
    // })
};
