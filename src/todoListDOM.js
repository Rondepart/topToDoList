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

export function displayTodo(tasks) {
    const todoSection = document.querySelector('.todolist-section');
    todoSection.innerHTML = '';
    const emptyProjectMsg = 'You have no task in this project'; 

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

        taskTitle.textContent = task.title;
        taskDescription.textContent = task.description;
        taskDueDate.textContent = task.dueDate;
        taskPriority.textContent = task.priority;
        taskNote.textContent = task.note;

        taskCard.append(taskTitle, taskDescription, taskDueDate, taskPriority, taskNote);
        todoSection.appendChild(taskCard);

    });
}