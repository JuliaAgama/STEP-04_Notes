// app/services/jsonHandler.js
// Помощник по JSONу
;
class JsonHandler {

    static createResponse (callBack) {
        const response = {
            status: true,
            message: "",
            data: []
        };

        try {
            response.data = callBack ();
        } catch (err) {
            response.status = false;
            response.message = err.message
        }

        return JSON.stringify(response);
    }

}

module.exports = JsonHandler;
