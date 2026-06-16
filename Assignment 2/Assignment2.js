let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const form = document.getElementById('taskForm');
const contentInput = document.getElementById('content');
const dueDateInput = document.getElementById('dueDate');
const statusSelect = document.getElementById('status');
const assignedToInput = document.getElementById('assignedTo');
const taskList = document.getElementById('taskList');

let editingId = null;

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${task.content}</td>
            <td>${task.dueDate}</td>
            <td>${task.status}</td>
            <td>${task.assignedTo}</td>
            <td>
                <button class="btn-edit" onclick="editTask(${task.id})">Sửa</button>
                <button class="btn-delete" onclick="deleteTask(${task.id})">Xóa</button>
            </td>
        `;
        taskList.appendChild(row);
    });
}

form.onsubmit = function(e) {
    e.preventDefault();
    
    const content = contentInput.value.trim();
    const dueDate = dueDateInput.value;
    const status = statusSelect.value;
    const assignedTo = assignedToInput.value.trim();

    if (!content || !dueDate || !assignedTo) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }

    if (editingId !== null) {
        const index = tasks.findIndex(t => t.id === editingId);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], content, dueDate, status, assignedTo };
        }
        editingId = null;
    } else {
        const newTask = {
            id: Date.now(),
            content,
            dueDate,
            status,
            assignedTo
        };
        tasks.push(newTask);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    form.reset();
    document.querySelector('form button').textContent = 'Submit';
};

function deleteTask(id) {
    if (confirm('Bạn có chắc muốn xóa task này?')) {
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        contentInput.value = task.content;
        dueDateInput.value = task.dueDate;
        statusSelect.value = task.status;
        assignedToInput.value = task.assignedTo;
        editingId = id;
        document.querySelector('form button').textContent = 'Update';
    }
}

renderTasks();