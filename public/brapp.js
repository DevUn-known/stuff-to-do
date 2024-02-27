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
});