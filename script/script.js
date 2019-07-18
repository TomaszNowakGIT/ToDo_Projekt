let $list;
let $input;
let $add_todo;
let done_btn;
let edit_btn;
let delete_btn;
let $accept_btn;
let $cancel_btn;
let $close_btn;
let $popup;
let $edit_input;
let index = 0;
let currentTodo = 0;

const initialList = ['Pozmywaj naczynia', 'Zrób zakupy', 'Wyprowadź psa'];

function main() {
    prepareDOMElements();
    prepareInitialList();
    prepareDOMEvents();
}

function prepareDOMElements() {
    $list = document.getElementById('list');
    $input = document.getElementById('input_todo');
    $add_todo = document.getElementById('add_todo');
    done_btn = document.querySelector('done');
    edit_btn = document.querySelector('edit');
    delete_btn = document.querySelector('delete');
    $accept_btn = document.getElementById('accept');
    $cancel_btn = document.getElementById('cancel');
    $close_btn = document.getElementById('close');
    $popup = document.getElementById('popup');
    $edit_input = document.getElementById('edit_input');
}

function prepareDOMEvents() {
    $add_todo.addEventListener('click', addButtonClickHandler);
    $list.addEventListener('click', listClickManager);
    $cancel_btn.addEventListener('click', closePopup);
    $accept_btn.addEventListener('click', acceptChangeHandler);
    $close_btn.addEventListener('click', closePopup);
}

function prepareInitialList() {
    initialList.forEach(todo => {
        addNewElementToList(todo);
    });
}

function addButtonClickHandler() {
    if ($input.value.trim()) {
        addNewElementToList($input.value);
    }
}

function addNewElementToList(title) {
    const newElement = createElement(title);
    $list.appendChild(newElement);
}

function createElement(title) {

    let newElement = document.createElement('li');
    newElement.id = 'todo-' + ++index;
    newElement.classList.add('collection-item');

    let newSpan = document.createElement('span')
    newSpan.innerText = title;
    newElement.appendChild(newSpan)

    let newDiv = document.createElement('div');
    newDiv.classList.add('all_buttons');
    newDiv.id = 'all_btn';
    newElement.appendChild(newDiv);

    let newButtonDelete = document.createElement('button');
    newButtonDelete.innerText = 'delete';
    newButtonDelete.classList.add('delete', 'btn-small', 'waves-effect', 'waves-light', 'material-icons', 'delete');
    newButtonDelete.id = 'delete_' + index;
    newDiv.appendChild(newButtonDelete);

    let newButtonEdit = document.createElement('button');
    newButtonEdit.innerText = 'edit';
    newButtonEdit.classList.add('edit', 'btn-small', 'waves-effect', 'waves-light', 'material-icons', 'edit');
    newButtonEdit.id = 'edit_' + index;
    newDiv.appendChild(newButtonEdit);

    let newButtonDone = document.createElement('button');
    newButtonDone.innerText = 'done';
    newButtonDone.classList.add('doneb', 'btn-small', 'waves-effect', 'waves-light', 'material-icons');
    newButtonDone.id = 'done_' + index;
    newDiv.appendChild(newButtonDone);

    return newElement;

}

function listClickManager(event) {
    if (event.target.className === 'delete btn-small waves-effect waves-light material-icons') {
        removeListElement(event.target.parentElement.parentElement.id);
    } else if (event.target.className === 'edit btn-small waves-effect waves-light material-icons') {
        editListElement(event.target.parentElement.parentElement.id)
    } else if (event.target.className === 'doneb btn-small waves-effect waves-light material-icons') {
        markElementAsDone(event.target.parentElement.parentElement.id)
    }
}

function removeListElement(id) {
    document.getElementById(id).remove();
}

function editListElement(id) {
    let edit_text = document.getElementById(id);
    addDataToPopup(edit_text.firstChild.innerText, id);
    currentTodo = id;
    openPopup();
}

function addDataToPopup(title, id) {
    $edit_input.value = title, id;
}

function acceptChangeHandler() {
    let newText = $edit_input.value
    var todoEditText = document.querySelector('#' + currentTodo + ' span');
    todoEditText.innerText = newText;
    closePopup()

}

function openPopup() {
    $popup.style.display = "flex";
}

function closePopup() {
    $popup.style.display = "none";
}


function markElementAsDone(id) {
    let done = document.getElementById(id);
    done.classList.toggle('done')

}
document.addEventListener('DOMContentLoaded', main);