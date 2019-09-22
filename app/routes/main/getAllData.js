// app/routes/main/getAllNotes.js
// функция для сбора всех данных из всех коллекций кластера"/"
;
const collectionHandler = require('../../services/collectionHandler');

module.exports = async function (database) {
    let allNotes = [];
    let collections = await database.listCollections({}, {nameOnly: true}).toArray();
    let colNames = collections.map(el => el.name);
    for (let el of colNames) {
        let items = await (collectionHandler.createResponse(database.collection(el).find()))
        for (let item of items) {
            allNotes.push(item);
        }
    };
    return allNotes;
};
