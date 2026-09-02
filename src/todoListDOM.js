export function displayProjects(projects) {
    const sidebarProject = document.querySelector('.sidebar-projects');
    sidebarProject.innerHTML = '';

    Object.values(projects).forEach(project => {
        const projectListItem = document.createElement('li');
        const projectBtn = document.createElement('button');

        projectBtn.classList.add('project-btn');
        projectBtn.dataset.projectId = project.projectID;
        projectBtn.textContent = project.title;

        projectListItem.appendChild(projectBtn);
        sidebarProject.appendChild(projectListItem);
    });
}

export function initDueRefresh() {
    setInterval(() => {
        document.querySelectorAll('.task-card-duedate').forEach(updDue => {
            updDue.textContent = getDueDateLabel(updDue.getAttribute('datetime'));
        });
    }, 60*1000)
}

function getDueDateLabel(dueDateStr) {
    if (dueDateStr === 'No due date') return dueDateStr;

    const [year, month, day] = dueDateStr.split('-').map(Number);
    const dueDate = new Date(year, month - 1, day);

    const dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0);

    const diffDays = Math.round((dueDate - dateToday) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays > 1) return `${diffDays} days left`;
    return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'}`;
}

export function displayTodo(tasks) {
    const todoSection = document.querySelector('.todolist-section');
    todoSection.innerHTML = '';
    const emptyProjectMsg = 'You have no task in this project'; 
    const priorityLabels = ['Low', 'Moderate', 'High'];

    if(tasks.length === 0) {
        todoSection.textContent = emptyProjectMsg;
        return;
    };

    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        const taskTitle = document.createElement('h3');
        const taskDescription = document.createElement('p');
        const taskDueDate = document.createElement('time');
        const taskPriority = document.createElement('div');
        const taskNote = document.createElement('p');
        const dltTaskBtn = document.createElement('button');

        taskCard.classList.add('task-card');
        taskCard.dataset.projectGroupId = task.projectGroupID;
        taskTitle.classList.add('task-card-title');
        taskDescription.classList.add('task-card-description');
        taskDueDate.classList.add('task-card-duedate');
        taskPriority.classList.add('task-card-priority');
        taskNote.classList.add('task-note');
        dltTaskBtn.classList.add('dlt-task-btn');
        dltTaskBtn.dataset.taskId = task.taskID;

        taskTitle.textContent = task.title;
        taskDescription.textContent = task.description;
        taskDueDate.textContent = getDueDateLabel(task.dueDate);
        taskDueDate.setAttribute('datetime', task.dueDate);
        taskPriority.textContent = priorityLabels[task.priority];
        taskNote.textContent = task.note;
        dltTaskBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>';

        taskCard.append(taskTitle, taskDescription, taskDueDate, taskPriority, taskNote, dltTaskBtn);
        todoSection.appendChild(taskCard);

    });
}