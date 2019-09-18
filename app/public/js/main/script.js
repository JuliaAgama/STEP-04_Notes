// app/public/js/script.js
// В СВЕТЕ ТОГО, ЧТО СТРОИМ СТРАНИЦУ ПОЛНОСТЬЮ С СЕРВЕРА, НУЖНО ПЕРЕСМОТРЕТЬ СТРУКТУРУ КЛИЕНТСКИХ JSов
;
/** MAIN CONTROLLER */
// файл, управляющий работой других js файлов. Не должен иметь прямого доступа и обращения к названиям и содержанию DOM-элементов или к серверу.
//Обращение к DOM-элементам - через переменные и методы из UICtrl.
//Обращение к серверу - через вызов методов из RqstCtrl.

((UICtrl, RqstCtrl) => {

    let DOM = UICtrl.getDOM(); // получение элементов из HTML через переменные от UICtrl

    const composeResult = UICtrl.composeResult; //метод создания HTML-элементов (из UICtrl)

    const requestImitation = RqstCtrl.requestImitation; //метод получения данных с сервера


    DOM.$testButton.on('click', function (event) {
        event.preventDefault();
        try {
            $(this).next()[0]
                ? $(this).next().remove()
                : $(this).after(composeResult(requestImitation()));
        } catch (err) {
            console.log('ERROR HERE: ', err);
        }
    });


})(UserInterfaceController, RequestController);
