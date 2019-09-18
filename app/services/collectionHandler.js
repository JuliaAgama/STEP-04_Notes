// app/services/collectionHandler.js
// Помощник по обработке с коллекции
;
class CollectionHandler {
    /**
     *
     */
    static createResponse(collection) {
        return new Promise((resolve, reject) => {
            collection.toArray((err, items) => {
                if (err) {
                    reject(err)
                }

                resolve(items);
            });
        });
    }
}

module.exports = CollectionHandler;
