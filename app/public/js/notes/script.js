// app/public/js/notes/script.js
// "клиентский" скрипт для страницы '.../notes
;

function saveNote () {
    const noteForm = document.getElementById('noteForm');
    console.log(noteForm.dataset.id);
    
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
        .then(res => {
                console.log(res);
            })
        // .then(response => {
        //     if (response.ok) {
        //         location = '/'
        //         console.log(response);
        //     } else throw new Error(response);
        // })
        // .catch(error => console.error('Error:', error));
}







