// <-- $populate -->

// <div class="list-title">${str}<div>

const addList = (str, id) => {
    listContainer.innerHTML += `
        <li data-id="${id}">
            <div class="list-title">${str.slice(0,1).toUpperCase() + str.slice(1)}</div>
            <div class="edit-btn">
                <button type="button" class="edit"><i class="fa-solid fa-pencil"></i></button>
            </div>
            <div class="delete-btn">
                <button type="button" class="delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        </li>
    `
}

const data = ['grocery list'];

const listSection = document.getElementById('lists');
const listContainer = document.querySelector('#lists ul');

data.forEach((str, i) => {
    addList(str, i);
})

// <-- $lists -->
const refresh = () => {
    const lists = document.querySelectorAll('#lists li');
    lists.forEach(list => {
        // <---- $button ----> //
        const editBtn = list.querySelector('button.edit');
        const deleteBtn = list.querySelector('button.delete');
        deleteBtn.addEventListener('click', e => {
            listContainer.removeChild(list);
        })
        editBtn.addEventListener('click', e => {
            window.location.replace('/tasks/');
        })
    });
}

refresh();

/* $add form */

const addBtn = document.getElementById('list-create-btn');
const listInput = document.getElementById('new-list-title');

addBtn.addEventListener('click', e => {
    e.preventDefault();
    if (listInput.value) addList(listInput.value, Date.now());
    listInput.value = '';
    refresh();
})

/* $side menu */

const menuBtn = document.getElementById('menu-btn');
const sideMenu = document.getElementById('side-menu');

menuBtn.addEventListener('click', e => {
    sideMenu.classList.toggle('show');
    menuBtn.classList.toggle('open');
})

/* settings */

const settingsBtns = document.querySelectorAll('button.settings');
const closeSettingsBtn = document.querySelector('#settings-modal button.modal-close-btn');
const settingsModal = document.querySelector('#settings-modal');

settingsBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        settingsModal.classList.remove('hidden')
    })
});

closeSettingsBtn.addEventListener('click', e => {
    settingsModal.classList.add('hidden');
})