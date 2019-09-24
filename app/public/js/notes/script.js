// // app/public/js/notes/script.js
// // "клиентский" скрипт для страницы '.../notes
// ;
//
// const noteForm = document.getElementById('noteForm');
// console.log(noteForm);
//
// noteForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     if (noteForm.checkValidity() === true){
//         const formData = new FormData(noteForm);
//
//         fetch('/api/notes', {
//             method: 'POST',
//             body: formData
//         })
//             .then(res =>{
//                 location = '/';
//                 console.log('works');
//             })
//             .catch(err =>{
//                 console.log(err);
//             });
//     }
// });
//
//
