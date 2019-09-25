// "клиентский" скрипт для страницы '.../lists'
;

let form;
let addListItem;

window.addEventListener('DOMContentLoaded', () => {
    form = document.getElementById('needs-validation');
    addListItem = document.getElementById('add-list-item');
});

const plusList = (ev) => {
    if (ev.target.closest('.input-group').nextElementSibling === addListItem) {
        addListItem.hidden = false;
    };
};

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
                <input type="checkbox" name="isdone" onchange="completeItem(event)">
            </div>
        </div>
        <input class="form-control" type="text" name="description" placeholder="List item" oninput="plusList(event)" onkeydown="enterKey(event)" required>
        <div class="input-group-append delete" onclick="removeItem(event)">
            <span class="input-group-text"><i class="far fa-times-circle"></i></span>
        </div>
        <div class="invalid-feedback>Please fill or delete the list item.</div>
    `;
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
    if (event.key === "Enter" && ev.srcElement.textLength > 1) {
        addField();
    }
};