// app/public/js/notes/script.js
// "клиентский" скрипт для страницы '.../notes
;


// const noteForm = document.getElementById('noteForm');
// console.log(noteForm);

// noteForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     if (noteForm.checkValidity() === true){
//         const formData = new FormData(noteForm);
//
//         fetch('/api/notes', {
//             method: 'POST',
//
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

const saveBtn = document.getElementById('save-btn');


saveBtn.addEventListener('сlick', function (e) {
    // e.preventDefault();

    let putBody = {};
    putBody.title = form.elements.title.value;
    putBody.description = form.elements.title.value;


    fetch('/api/notes/'+ noteId, {
            method: 'PUT',

            body:
        })
            .then(res =>{
                location = '/';
                console.log('works');
            })
            .catch(err =>{
                console.log(err);
            });
    });

function saveNote (id) {
    fetch('/api/notes/'+ id, {
        method: 'PUT',
        body:
        }

    )

};