import * as listManager from './todoList.js';
import * as listDOM from './todoListDOM.js';

let currentProjectGroupID = listManager.getDefaultProjectID();
let projectTasks = listManager.getProjectTasks(currentProjectGroupID);

function updProjectTasks() {
    projectTasks = listManager.getProjectTasks(currentProjectGroupID);
    listDOM.displayTodo(projectTasks);
}

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

        const currentGroupID = projectBtn.dataset.projectId;
        currentProjectGroupID = currentGroupID;
        updProjectTasks();
    });

    addProjectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const projectTitle = projectTitleInput.value;

        if(projectTitle === '') return;

        const newProjectID = listManager.createProject(projectTitle);

        const projects = listManager.getProjects();
        listDOM.displayProjects(projects);

        currentProjectGroupID = newProjectID;
        updProjectTasks();

        addProjectModal.close();
        addProjectForm.reset();
    });
}

function getTaskFields({title, description, duedate, priority, note}) {
    return {
        title: document.querySelector(title),
        description: document.querySelector(description),
        duedate: document.querySelector(duedate),
        priority: document.querySelector(priority),
        note: document.querySelector(note),
    };
}

export function initTodoListEvents() {
    const listWrapper = document.querySelector('.todolist-wrapper');
    //add task
    const addTaskModal = document.querySelector('#add-task');
    const addTaskForm = document.querySelector('.add-task-form');
    const addTaskFields = getTaskFields({
        title: '.task-title',
        description: '.task-description',
        duedate: '.task-duedate',
        priority: '.task-priority',
        note: '.task-note'
    });
    //edit task
    const editTaskFields = getTaskFields({
        title: '.edit-task-title',
        description: '.edit-task-description',
        duedate: '.edit-task-duedate',
        priority: '.edit-task-priority',
        note: '.edit-task-note'
    });
    const editTaskModal = document.querySelector('#edit-task');

    addTaskForm.addEventListener('submit' ,function(e) {
        e.preventDefault();
        listManager.createTask(
            addTaskFields.title.value, 
            addTaskFields.description.value, 
            addTaskFields.duedate.value, 
            Number(addTaskFields.priority.value), 
            addTaskFields.note.value, 
            currentProjectGroupID
        );
        
        updProjectTasks();
        addTaskModal.close();
        addTaskForm.reset();
    });

    //handles task card dlt btn
    listWrapper.addEventListener('click', function(e){
        const dltTaskBtn = e.target.closest('.dlt-task-btn');
        if(!(dltTaskBtn)) return;

        listManager.deleteTask(dltTaskBtn.dataset.taskId);
        updProjectTasks();
    });
}