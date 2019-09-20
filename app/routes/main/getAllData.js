// app/routes/main/getAllNotes.js
// функция для сбора всех данных из всех коллекций кластера"/"
;
const collectionHandler = require('../../services/collectionHandler');

module.exports = async function (array, database) {
    let allNotes = [];
    for (let el of array) {
        await (collectionHandler.createResponse(database.collection(el).find()))
        .then(items => {
            for (let item of items) {
                allNotes.push(item);
            }
        })
    };
    return allNotes;
};
