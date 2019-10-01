// "клиентский" скрипт для страницы '.../lists'
;

let form;
let addListItem;
let picture;
let s3up;
let fileInp;
let crBtn;

window.addEventListener('DOMContentLoaded', () => {
    form = document.getElementById('needs-validation');
    addListItem = document.getElementById('add-list-item');
    picture = document.getElementById('picture');
    s3up = picture.src;
    fileInp = document.getElementById('inpfile');
    crBtn = document.getElementById('create');
});

const plusList = (ev) => {
    if (ev.target.closest('.input-group').nextElementSibling === addListItem) {
        addListItem.hidden = false;
    }; 
}

const removeItem = (ev) => {
    if (form.elements.length > 3) {
    ev.target.closest('.input-group').remove();
    }
};

const taskItem = () => {
    const itm = document.createElement('div');
    itm.classList.add('input-group', 'mb-3');
    itm.innerHTML = `
        <div class="input-group-prepend">
            <div class="input-group-text">
                <input type="checkbox" name="isdone" onchange="completeItem(event)" disabled>
            </div>
        </div>
        <input class="form-control" type="text" name="description" placeholder="List item" oninput="plusList(event)" onkeyup="enterKey(event)" required>
        <div class="input-group-append delete" onclick="removeItem(event)">
            <span class="input-group-text"><i class="far fa-times-circle"></i></span>
        </div>
        <div class="invalid-feedback">Please fill or delete the list item.</div>`

    return itm;
};

const completeItem = (ev) => {
    const formInput = ev.target.closest('.input-group-prepend').nextElementSibling;
    if (ev.target.checked === true) {
        formInput.style = "text-decoration-line: line-through";
        formInput.disabled = true;
        ev.target.closest('.input-group').classList.add('order-last');
    } else {
        formInput.style = "text-decoration-line: none";
        formInput.disabled = false;
        ev.target.closest('.input-group').classList.remove('order-last');
    }
};

const addField = () => {
    addListItem.before(taskItem());
    addListItem.previousElementSibling.children.namedItem('description').focus();
    addListItem.hidden = true;
};

const formBody = () => {
    const tasksArr = [];
    if (form.elements.length > 3) {
        form.elements.description.forEach((el,idx) => {
            tasksArr.push({ description: el.value,
                            isdone: form.elements.isdone.item(idx).checked })
        });
        tasksArr.sort((a,b) => a.isdone === b.isdone ? 0 : a.isdone? 1 : -1);
    } else {
        tasksArr.push({ description: form.elements.description.value,
                        isdone: form.elements.isdone.checked });
    }
    let postBody = {};
    postBody.title = form.elements.title.value || '';
    postBody.tasks = tasksArr;
    postBody.type = 'list';
    postBody.imgurl = s3up;

    return postBody;
};

const createBtnClick = () => {
    if (form.checkValidity() === true) {
        fetch('/api/lists', {
            method: 'POST',
            body: JSON.stringify(formBody()),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                location = '/';
            } else {
                throw new Error(response);
            }
        })
        .catch(error => console.error('Error:', error));
    }
    form.classList.add('was-validated');
};

const saveBtnClick = () => {
    if (form.checkValidity() === true) {
        fetch(`/api/lists/${form.dataset.id}`, {
            method: 'PUT',
            body: JSON.stringify(formBody()),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                location = '/';
            } else {
                throw new Error(response);
            };
        })
        .catch(error => console.error('Error:', error));
    }
    form.classList.add('was-validated');
};

const deleteBtnClick = () => {
    fetch(`/api/lists/${form.dataset.id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            location = '/';
        } else {
            throw new Error(response);
        };
    })
};

const enterKey = (ev) => {
    const checkbox = ev.target.previousElementSibling.firstElementChild.firstElementChild;

    if (event.key === "Enter" && ev.target.value.length > 0) {
        addField();
    } 
    
    if (ev.target.value.length > 0) {
        checkbox.disabled = false;
    } else checkbox.disabled = true;
}

const s3upload = (ev) => {
    crBtn.disabled = true;
    const file = fileInp.files[0];
    fetch(`/sign-s3?file-name=${encodeURIComponent(file.name)}&file-type=${encodeURIComponent(file.type)}`)
    .then(r => {
        if (r.ok) {
        return r.json()
        }
    })
    .then(res => {
        s3up = encodeURI(res.url);
        
        fetch(res.signedRequest, {
            method: 'PUT',
            body: file
            })
        .then(r => {
            if (r.ok) {
                picture.classList.remove("d-none");
                picture.src = s3up;
                crBtn.disabled = false;
                fileInp.nextElementSibling.textContent = fileInp.files[0].name;
            }
        })
        .catch(err =>  {
            console.log('There has been a problem with your fetch operation: ', err.message);
        })
    })
};

const removeImg = (ev) => {
    picture.src = '';
    s3up = '';
    fileInp.nextElementSibling.textContent = '';
}