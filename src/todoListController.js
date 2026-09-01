import * as listManager from './todoList.js';
import * as listDOM from './todoListDOM.js';

let currentProjectGroupID = listManager.getDefaultProjectID(); 

export function initSidebarEvents() {
    const sidebarProjects = document.querySelector('.sidebar-projects');
    const addProjectModal = document.querySelector('#add-project');
    const addProjectForm = document.querySelector('.add-project-form');
    const projectTitleInput = document.querySelector('.project-title');

    sidebarProjects.addEventListener('click', function(e) {
        const projectBtn = e.target.closest('.project-btn');
        if(!projectBtn) {
            return;
        }

        const currentGroupID = e.target.dataset.projectId;
        const projectTasks = listManager.getProjectTasks(currentGroupID);
        listDOM.displayTodo(projectTasks);
        currentProjectGroupID = currentGroupID;
    });

    addProjectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const projectTitle = projectTitleInput.value;

        if(projectTitle === '') return;

        listManager.createProject(projectTitle);

        const projects = listManager.getProjects();
        listDOM.displayProjects(projects);
        
        addProjectModal.close();
        addProjectForm.reset();
    });
}

export function initTodoListEvents() {
    const addTaskModal = document.querySelector('#add-task');
    const addTaskForm = document.querySelector('.add-task-form');
    const taskTitleInput = document.querySelector('.task-title');
    const taskDescriptionInput = document.querySelector('.task-description');
    const taskDueDateInput = document.querySelector('.task-duedate');
    const taskPriorityInput = document.querySelector('.task-priority');
    const taskNoteInput = document.querySelector('.task-note');

    addTaskForm.addEventListener('submit' ,function(e) {
        e.preventDefault();
        const taskTitle = taskTitleInput.value;
        const taskDescription = taskDescriptionInput.value;
        const taskDueDate = taskDueDateInput.value;
        const taskPriority = Number(taskPriorityInput.value);
        const taskNote = taskNoteInput.value;

        listManager.createTask(taskTitle, taskDescription, taskDueDate, taskPriority, taskNote, currentProjectGroupID);
        
        const projectTasks = listManager.getProjectTasks(currentProjectGroupID);
        listDOM.displayTodo(projectTasks);
        
        addTaskModal.close();
        addTaskForm.reset();
    });
}