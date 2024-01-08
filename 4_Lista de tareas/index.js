//Creacion de constantes para manipular el DOM
const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const completeAllTasks = document.getElementById('completeAllTasks');

//Funcion para añadir las tareas
const addTask = () => {
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const title = titleInput.value;
    const description = descriptionInput.value;
    
    if (title && description) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `<button id="completeTask">X</button><h2>${title}</h2><hr><p>${description}</p>`;

        taskList.appendChild(taskItem);

        titleInput.value = '';
        descriptionInput.value = '';

        const completeTask = taskItem.querySelector('#completeTask');
        completeTask.addEventListener('click', () => {
            taskItem.classList.add('taskCompleted');
            setTimeout(() => {
                taskList.removeChild(taskItem);
            }, 1500);
        });
    }
}

//Funcion para eliminar todas las tareas
const removeAllTasks = () => {
    // while (taskList.firstChild) {
    //     taskList.removeChild(taskList.firstChild)
    // }
    taskList.innerHTML = ''; 
}

//Funcion para ocultar y mostrar elementos
const toggleCompleteAllButton = () => {
    const tasks = document.querySelectorAll('#taskList li');
    const imageDefault = document.getElementById('defaultImg');
    if (tasks.length > 0) {
        completeAllTasks.style.display = 'flex';
        imageDefault.style.display = 'none';
    } else {
        completeAllTasks.style.display = 'none';
        imageDefault.style.display = 'flex'
    }
}

//EvenListener de los botones
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
    toggleCompleteAllButton();
})

completeAllTasks.addEventListener('click', () => {
    removeAllTasks();
    toggleCompleteAllButton();
})