// <-- $populate -->

// <div class="list-title">${str}<div>

const handleError = err => {
    const res = err.response;
    alert(res.data.errorMessage);
    if (res.status === 401){
        window.location.assign('/login');
    }
}

const addList = (str, id) => {
    listContainer.innerHTML += `
        <li data-id="${id}">
            <div class="list-title">${str}</div>
            <div class="edit-btn">
                <button type="button" class="edit"><i class="fa-solid fa-pencil"></i></button>
            </div>
            <div class="delete-btn">
                <button type="button" class="delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        </li>
    `
}

const listSection = document.getElementById('lists');
const listContainer = document.querySelector('#lists ul');

// <-- $lists -->
const refresh = () => {
    const lists = document.querySelectorAll('#lists li');
    if (!lists.length) listSection.classList.add('hidden');
    else listSection.classList.remove('hidden');
    lists.forEach(list => {
        // <---- $button ----> //
        const editBtn = list.querySelector('button.edit');
        const deleteBtn = list.querySelector('button.delete');
        const title = list.querySelector('.list-title').textContent;
        deleteBtn.addEventListener('click', e => {
            axios.delete('/api/v1/lists/' + list.dataset.id).then(res => {
                listContainer.removeChild(list);
            }).catch(err => handleError(err));
        })

        editBtn.addEventListener('click', e => {
            window.location.replace(`/tasks?listId=${list.dataset.id}`);
        })
    });
}

axios.get('/api/v1/lists/').then(res => {
    const lists = res.data;
    lists.forEach(list => {
        addList(list.title, list._id);
    })
    refresh();
}).catch(err => handleError(err));

/* $add form */

const addBtn = document.getElementById('list-create-btn');
const listInput = document.getElementById('new-list-title');

addBtn.addEventListener('click', e => {
    e.preventDefault();
    const title = listInput.value;
    if (title)
        axios.post('/api/v1/lists', {title}).then(res => {
            addList(res.data.title, res.data.id);
            listInput.value = '';
            refresh();
        }).catch(err => handleError(err));
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