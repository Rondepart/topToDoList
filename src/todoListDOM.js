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

        taskCard.classList.add('task-card');
        taskCard.dataset.projectGroupId = task.projectGroupID;
        taskTitle.classList.add('task-card-title');
        taskDescription.classList.add('task-card-description');
        taskDueDate.classList.add('task-card-duedate');
        taskPriority.classList.add('task-card-priority');
        taskNote.classList.add('task-note');

        taskTitle.textContent = task.title;
        taskDescription.textContent = task.description;
        taskDueDate.textContent = getDueDateLabel(task.dueDate);
        taskDueDate.setAttribute('datetime', task.dueDate);
        taskPriority.textContent = priorityLabels[task.priority];
        taskNote.textContent = task.note;

        taskCard.append(taskTitle, taskDescription, taskDueDate, taskPriority, taskNote);
        todoSection.appendChild(taskCard);

    });
}