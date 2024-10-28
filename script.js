
const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTask');
const addTaskButton = document.getElementById('addTask');


const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    savedTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = "flex items-center justify-between p-2 border border-gray-300 rounded task-item";
        li.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <div class="buttons">
                <button class="edit-btn bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2" data-index="${index}">Editar</button>
                <button class="delete-btn bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" data-index="${index}">Excluir</button>
            </div>
        `;

        const taskText = li.querySelector('.task-text'); 


        taskText.addEventListener('click', () => {   
            toggleTaskStatus(index);
        });



        const deleteButton = li.querySelector('.delete-btn');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); 
            deleteTask(index);
        });

        const editButton = li.querySelector('.edit-btn');
        editButton.addEventListener('click', (event) => {
            event.stopPropagation(); 

            editTask(index);
        });

        taskList.appendChild(li);
    });
}



function addTask() {
    const newTaskText = newTaskInput.value.trim();
    if (newTaskText !== '') {
        savedTasks.push({ text: newTaskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        newTaskInput.value = '';
        renderTasks();
    }
}

function deleteTask(index) {
    savedTasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
    renderTasks();
}



function editTask(index) {
    const newText = prompt("Editar tarefa:", savedTasks[index].text);
    if (newText !== null && newText.trim() !== '') {
        savedTasks[index].text = newText;
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        renderTasks();
    }
}




function toggleTaskStatus(index) {
    savedTasks[index].completed = !savedTasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
    renderTasks();
}





addTaskButton.addEventListener('click', addTask);


renderTasks();