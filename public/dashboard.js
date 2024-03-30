// <-- $populate -->

const addTask = (str, id) => {
    taskContainer.innerHTML += `
        <li data-id="${id}">
            <span class="checkbox"></span>
            <input class="task-title" type="text" value="${str}" disabled="true">
            <div class="update-btns">
                <button type="button" class="edit"><i class="fa-solid fa-pencil"></i></button>
                <button type="button" class="save hidden"><i class="fa-solid fa-floppy-disk"></i></button>
            </div>
            <div class="delete-btn">
                <button type="button" class="delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        </li>
    `
}

const data = ['walk the dog', 'get groceries', 'cook lunch', 'wash the car'];

const taskSection = document.getElementById('tasks');
const taskContainer = document.querySelector('#tasks ul');

data.forEach((str, i) => {
    addTask(str, i);
})

// <-- $tasks -->
const refresh = () => {
    const tasks = document.querySelectorAll('#tasks li');
    // if (!tasks.length) taskSection.classList.add('hidden');
    // else taskSection.classList.remove('hidden');
    tasks.forEach(task => {
        const titleInput = task.querySelector('input.task-title');
        titleInput.disabled = true;
        // <---- $checkbox ----> //
        const checkbox = task.querySelector(".checkbox");
        checkbox.addEventListener('click', e => {
            checkbox.classList.toggle('checked');
            titleInput.classList.toggle('striked');
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
            setTimeout(() => {
                saveBtn.classList.add('hidden');
                editBtn.classList.remove('hidden');
                titleInput.disabled = true;
            }), 1000
        });
        deleteBtn.addEventListener('click', e => {
            taskContainer.removeChild(task);
        })
    });
}

refresh();

/* $add form */

const addBtn = document.getElementById('task-create-btn');
const taskInput = document.getElementById('new-task-title');

addBtn.addEventListener('click', e => {
    e.preventDefault();
    if (taskInput.value) addTask(taskInput.value, Date.now());
    taskInput.value = '';
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