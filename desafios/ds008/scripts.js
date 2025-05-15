const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const taskContainer = document.querySelector('.task-container');

// Valida o conteúdo do input
const validateInput = () => inputElement.value.trim().length > 0;

// Adiciona nova tarefa
const handleAddTask = () => {
    const inputIsValid = validateInput();

    if (!inputIsValid) {
        inputElement.classList.add("error");
        return;
    }

    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.innerText = inputElement.value;
    taskContent.classList.add("task-text");

    // Marcar como concluída
    taskContent.addEventListener('click', () => {
        taskContent.classList.toggle('completed');
        updateLocalStorage();
    });

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far", "fa-trash-alt", "delete-icon");

    // Deletar tarefa
    deleteItem.addEventListener('click', () => {
        taskItemContainer.remove();
        updateLocalStorage();
    });

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    taskContainer.appendChild(taskItemContainer);

    inputElement.value = "";
    inputElement.classList.remove("error");

    updateLocalStorage();
};

// Valida erro de digitação
const handleInputChange = () => {
    if (validateInput()) {
        inputElement.classList.remove("error");
    }
};

// Salva no localStorage
const updateLocalStorage = () => {
    const tasks = Array.from(taskContainer.children);

    const localStorageTasks = tasks.map(task => {
        const content = task.querySelector("p");
        const isCompleted = content.classList.contains("completed");
        return { description: content.innerText, isCompleted };
    });

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

// Carrega tarefas salvas
const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
    if (!tasksFromLocalStorage) return;

    for (const task of tasksFromLocalStorage) {
        const taskItemContainer = document.createElement('div');
        taskItemContainer.classList.add('task-item');

        const taskContent = document.createElement('p');
        taskContent.innerText = task.description;
        taskContent.classList.add("task-text");

        if (task.isCompleted) {
            taskContent.classList.add("completed");
        }

        taskContent.addEventListener('click', () => {
            taskContent.classList.toggle('completed');
            updateLocalStorage();
        });

        const deleteItem = document.createElement("i");
        deleteItem.classList.add("far", "fa-trash-alt", "delete-icon");

        deleteItem.addEventListener('click', () => {
            taskItemContainer.remove();
            updateLocalStorage();
        });

        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
        taskContainer.appendChild(taskItemContainer);
    }
};

// Inicializa
refreshTasksUsingLocalStorage();
addTaskButton.addEventListener("click", handleAddTask);
inputElement.addEventListener("input", handleInputChange);
