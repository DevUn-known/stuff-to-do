// <---- Check box control ----> //

const checkboxes = document.querySelectorAll(".checkbox");

checkboxes.forEach(checkbox => {
    const titleInput = checkbox.parentElement.querySelector('input.task-title');
    checkbox.addEventListener('click', e => {
        checkbox.classList.toggle('checked');
        titleInput.classList.toggle('striked');
        console.log(titleInput);
    })
})