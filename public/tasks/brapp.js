let listParam = new URL(window.location).searchParams.get('listId');
const listTitleDis = document.getElementById('list-title-display');

const handleError = err => {
    const res = err.response;
    alert(res.data);
    if (res.status === 401){
        window.location.assign('/login');
    }
}



// <-- $populate -->

const addTask = (str, id, completed) => {
    taskContainer.innerHTML += `
        <li data-id="${id}">
            <span class="checkbox ${completed? 'checked' : ''}"></span>
            <input class="task-title ${completed? 'striked' : ''}" type="text" value="${str}" disabled="true">
            <div class="update-btns">
                <button type="button" class="edit"><i class="fa-solid fa-pencil"></i></button>
                <button type="button" class="save hidden"><i class="fa-solid fa-floppy-disk"></i></button>
            </div>
            <div class="delete-btn">
                <button type="button" class="delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        </li>
    `;
}

// const data = ['Onion (2kg)', 'Milk (2 packets)', 'Carrot (1kg)', 'lemon (0.5kg)'];
const data = [];

// <-- $back -->

const backBtn = document.getElementById('back-btn');

backBtn.addEventListener('click', e => {
    window.location.replace('/lists/');
})

const taskSection = document.getElementById('tasks');
const taskContainer = document.querySelector('#tasks ul');

// <-- $tasks -->
const refresh = () => {
    const tasks = document.querySelectorAll('#tasks li');
    if (!tasks.length) taskSection.classList.add('hidden');
    else taskSection.classList.remove('hidden');
    tasks.forEach(task => {
        task.style.order = 0;
        const titleInput = task.querySelector('input.task-title');
        titleInput.disabled = true;
        // <---- $checkbox ----> //
        const checkbox = task.querySelector(".checkbox");
        checkbox.addEventListener('click', e => {
            axios.patch(
                `/api/v1/tasks/${listParam}/${task.dataset.id}`,
                {completed: !checkbox.classList.contains('checked')}
            ).then(res => {
                checkbox.classList.toggle('checked');
                titleInput.classList.toggle('striked');
                setTimeout(() => {
                    const orders = [...tasks].map(el => el.style.order);
                    if (checkbox.classList.contains('checked'))
                        task.style.order = Math.max(...orders) - 1;
                    else task.style.order = Math.min(...orders) + 1;
                }, 500);
            }).catch(err => handleError(err));
        });
        // <---- $button ----> //
        const editBtn = task.querySelector('button.edit')
        const saveBtn = task.querySelector('button.save');
        const deleteBtn = task.querySelector('button.delete');
        editBtn.addEventListener('click', e => {
            setTimeout(() => {
                editBtn.classList.add('hidden');
                saveBtn.classList.remove('hidden');
                titleInput.disabled = false;
                titleInput.focus();
                titleInput.select();
            }), 1000
        });
        saveBtn.addEventListener('click', e => {
            axios.patch(`/api/v1/tasks/${listParam}/${task.dataset.id}`, {title: titleInput.value})
            .then(res => { 
                setTimeout(() => {
                    saveBtn.classList.add('hidden');
                    editBtn.classList.remove('hidden');
                    titleInput.disabled = true;
                }, 100);
            }).catch(err => handleError(err));
        });
        deleteBtn.addEventListener('click', e => {
            axios.delete(`/api/v1/tasks/${listParam}/${task.dataset.id}`).then(res => {
                taskContainer.removeChild(task);
            }).catch(err => handleError(err));
        })
    });
}

const setListTitle = (listTitle, id) => {
    listTitleDis.dataset.id = id;
    listTitleDis.innerHTML = `
        <input class="list-title" type="text" value="${listTitle}" disabled="true">
        <div class="update-btns">
            <button type="button" class="edit"><i class="fa-solid fa-pencil"></i></button>
            <button type="button" class="save hidden"><i class="fa-solid fa-floppy-disk"></i></button>
        </div>
    `;

    const listInput = listTitleDis.querySelector('.list-title');
    const editBtn = listTitleDis.querySelector('button.edit')
    const saveBtn = listTitleDis.querySelector('button.save');
    editBtn.addEventListener('click', e => {
        setTimeout(() => {
            editBtn.classList.add('hidden');
            saveBtn.classList.remove('hidden');
            listInput.disabled = false;
            listInput.focus();
            listInput.select();
        }), 1000
    });
    saveBtn.addEventListener('click', e => {
        axios.patch(`/api/v1/lists/${listParam}`, {title: listInput.value})
        .then(res => {
            setTimeout(() => {
                saveBtn.classList.add('hidden');
                editBtn.classList.remove('hidden');
                listInput.disabled = true;
            }, 100);
        }).catch(err => handleError(err));
    });
}

axios.get(`/api/v1/tasks/${listParam}`).then(res => {
    const { listId, listTitle, tasks } = res.data;
    setListTitle(listTitle, listId);
    tasks.forEach(task => {
        addTask(task.title, task._id, task.completed);
    })
    refresh();
}).catch(err => handleError(err));

/* $add form */

const addBtn = document.getElementById('task-create-btn');
const taskInput = document.getElementById('new-task-title');

addBtn.addEventListener('click', e => {
    e.preventDefault();
    if (taskInput.value)
        axios.post(`/api/v1/tasks/${listParam}`, {title: taskInput.value})
        .then(res => {
            const newTask = res.data;
            addTask(newTask.title, newTask._id);
            taskInput.value = '';
            refresh();
        }).catch(err => handleError(err));
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