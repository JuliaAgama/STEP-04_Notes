// app/public/js/uiCtrl.js
// В СВЕТЕ ТОГО, ЧТО СТРОИМ СТРАНИЦУ ПОЛНОСТЬЮ С СЕРВЕРА пагом, НУЖНО ПЕРЕСМОТРЕТЬ СТРУКТУРУ КЛИЕНТСКИХ JSов

;
/** USER INTERFACE CONTROLLER (DOM) */
// файл, отвечающий за прямое взаимодействие с DOM.

const UserInterfaceController = (function () {

    let DOM = {
        $body: $('body'),
        $testButton: $('#test-button'),
    };


    return {
        getDOM: function () {
            return DOM;
        },

        composeResult: function (data) {
            let map = data.map(el => `<li class="list-item col-12 ml-5" id="item-${el.ind}">${el.text}</li>`);
            let html = `<div class="result-box row">${map.join()}</div>`;
            return html;
        }

    }

})();
