window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');
    let tasks = [];

    // Function to save tasks to localStorage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Function to load tasks from localStorage
    const loadTasks = () => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            tasks.forEach(task => {
                const task_el = createTaskElement(task);
                list_el.appendChild(task_el);
            });
        }
    };

    // Function to create task element
    const createTaskElement = (taskText) => {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = taskText;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);
        task_el.appendChild(task_content_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerHTML = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerHTML = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        task_el.appendChild(task_actions_el);

        // Event listener for editing task
        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() == 'edit') {
                task_input_el.removeAttribute('readonly');
                task_input_el.focus();
                task_edit_el.innerText = 'Save';
            } else {
                task_input_el.setAttribute('readonly', 'readonly');
                task_edit_el.innerText = 'Edit';
                // Find the index of the task in the tasks array
                const index = tasks.indexOf(task_input_el.value);
                if (index !== -1) {
                    // Update tasks array
                    tasks[index] = task_input_el.value;
                    saveTasks();
                }
            }
        });

        // Event listener for deleting task
        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            // Find the index of the task in the tasks array
            const index = tasks.indexOf(task_input_el.value);
            if (index !== -1) {
                // Remove task from tasks array
                tasks.splice(index, 1);
                saveTasks();
            }
        });

        return task_el;
    };

    // Load tasks when the page loads
    loadTasks();

    // Event listener for adding new task
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = input.value.trim();
        if (!task) {
            document.getElementById('demo').innerHTML = 'Please enter a text';
            return;
        }
        const task_el = createTaskElement(task);
        // list_el.appendChild(task_el);
        if (!tasks.includes(task)) {
            list_el.appendChild(task_el);
            document.getElementById('demo').innerHTML = '';
        } else {
            document.getElementById('demo').innerHTML = 'Task already exists...';
        }
        tasks.push(task);
        saveTasks();
        input.value = '';
    });
});
