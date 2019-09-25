// app/public/js/notes/script.js
// "клиентский" скрипт для страницы '.../notes
;
const noteForm = document.getElementById('noteForm');

function saveNote() {
    fetch(`/api/notes/${noteForm.dataset.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: noteForm.elements.title.value,
            description: noteForm.elements.description.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            location = '/'
            //сюда не заходит
        })

}

function deleteNote() {
    fetch(`/api/notes/${noteForm.dataset.id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            title: noteForm.elements.title.value,
            description: noteForm.elements.description.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            location = '/'
            //сюда не заходит
        })
}


//пришлось заходить сюдой
document.getElementById('save-btn').addEventListener('click', () => {
    if (noteForm.checkValidity() === true) {
        saveNote();
        location = '/';
    }
});


document.getElementById('delete-btn').addEventListener('click', () => {
    deleteNote();
    location = '/'
});



