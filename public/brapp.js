// <---- Check box control ----> //

const tasks = document.querySelectorAll('#tasks li');

tasks.forEach(task => {
    const titleInput = task.querySelector('input.task-title');
    titleInput.disabled = true;
    // checkbox
    const checkbox = task.querySelector(".checkbox");
    checkbox.addEventListener('click', e => {
        checkbox.classList.toggle('checked');
        titleInput.classList.toggle('striked');
    });
    // buttons
    const editBtn = task.querySelector('button.edit');
    console.log(editBtn);
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
            console.log(editBtn.classList);
            editBtn.classList.remove('hidden');
            titleInput.disabled = true;
            console.log(titleInput.disabled);
        }), 1000
    });
});