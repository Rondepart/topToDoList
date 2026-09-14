const DELETE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>';
const EDIT_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" /></svg>';
export function displayProjects(projects, defaultProjectID) {
    const sidebarProject = document.querySelector('.sidebar-projects');
    sidebarProject.innerHTML = '';

    Object.values(projects).forEach(project => {
        const projectListItem = document.createElement('li');
        const projectBtn = document.createElement('button');
        const projectID = project.projectID;

        projectBtn.classList.add('project-btn');
        projectBtn.dataset.projectId = projectID;
        projectBtn.textContent = project.title;

        projectListItem.appendChild(projectBtn);

        if (projectID !== defaultProjectID) {
            const projectActions = document.createElement('div');
            const dltProjectBtn = document.createElement('button');
            const editProjectBtn = document.createElement('button');

            projectActions.classList.add('project-actions');
            dltProjectBtn.classList.add('dlt-project-btn');
            editProjectBtn.classList.add('edit-project-btn');
            dltProjectBtn.dataset.projectId = projectID;
            editProjectBtn.dataset.projectId = projectID;
            editProjectBtn.title = 'Edit Project';
            dltProjectBtn.title = 'Delete Project';
            dltProjectBtn.innerHTML = DELETE_ICON;
            editProjectBtn.innerHTML = EDIT_ICON;

            projectActions.append(editProjectBtn, dltProjectBtn);
            projectListItem.appendChild(projectActions);
        }

        sidebarProject.appendChild(projectListItem);
    });
}

export function updProjectTitle(projectTitle) {
    const projectHeader = document.querySelector('.todolist-title');
    projectHeader.textContent = `${projectTitle} tasks`;
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
    const emptyProjectMsg = 'You have no tasks in this project'; 
    const priorityLabels = ['Low', 'Moderate', 'High'];

    if(tasks.length === 0) {
        todoSection.textContent = emptyProjectMsg;
        return;
    };

    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        const taskCardFields = document.createElement('div');
        const taskTitle = document.createElement('h3');
        const taskDescription = document.createElement('p');
        const taskDueDate = document.createElement('time');
        const taskPriority = document.createElement('div');
        const taskNote = document.createElement('p');
        const taskCardActions = document.createElement('div');
        const dltTaskBtn = document.createElement('button');
        const editTaskBtn = document.createElement('button');

        taskCard.classList.add('task-card');
        taskCard.dataset.projectGroupId = task.projectGroupID;
        taskCardFields.classList.add('task-card-fields');
        taskTitle.classList.add('task-card-title');
        taskDescription.classList.add('task-card-description');
        taskDueDate.classList.add('task-card-duedate');
        taskPriority.classList.add('task-card-priority');
        taskNote.classList.add('task-note');
        taskCardActions.classList.add('task-card-actions');
        editTaskBtn.classList.add('edit-task-btn');
        editTaskBtn.title = 'Edit Task';
        editTaskBtn.dataset.taskId = task.taskID;
        dltTaskBtn.classList.add('dlt-task-btn');
        dltTaskBtn.title = 'Delete Task';
        dltTaskBtn.dataset.taskId = task.taskID;

        taskTitle.textContent = task.title;
        taskDescription.textContent = task.description;
        taskDueDate.textContent = getDueDateLabel(task.dueDate);
        taskDueDate.setAttribute('datetime', task.dueDate);
        taskPriority.textContent = `Priority: ${priorityLabels[task.priority]}`;
        taskNote.textContent = `Note: ${task.note}`;
        dltTaskBtn.innerHTML = DELETE_ICON;
        editTaskBtn.innerHTML = EDIT_ICON;

        taskCardFields.append(taskTitle, taskDescription, taskDueDate, taskPriority, taskNote);
        taskCardActions.append(editTaskBtn,dltTaskBtn);
        taskCard.append(taskCardFields, taskCardActions);
        todoSection.appendChild(taskCard);

    });
}