// app/public/js/rqstCtrl.js
// В СВЕТЕ ТОГО, ЧТО СТРОИМ СТРАНИЦУ ПОЛНОСТЬЮ С СЕРВЕРА, НУЖНО ПЕРЕСМОТРЕТЬ СТРУКТУРУ КЛИЕНТСКИХ JSов

;
/** REQUESTS CONTROLLER */
// файл, отвечающий за прямое взаимодействие с сервером: отправку запросов, получение и обработку ответов от сервера

/******** REQUEST class for "get" method: ********/

class Request {
    get(url) {
        return $.get(url, "json")
        .then(r => r, e => console.log(e.statusText, '!!! something went wrong with $.get'))
    }
};


/******** REQUEST CONTROLLER: ********/

const RequestController = (function () {

    // имитация ответа от сервера:
    let testArr = [
        {
            ind: 1,
            text: 'my text 1'
        },
        {
            ind: 2,
            text: 'my text 2'
        },
        {
            ind: 3,
            text: 'my text 3'
        }
    ];

    return {

        // имитация получения ответа от сервера
        requestImitation:  function () {
            return testArr;
        }

    }

})();

