import * as listManager from './todoList.js';
import * as listDOM from './todoListDOM.js';

let currentProjectGroupID = listManager.getDefaultProjectID();
let projectTasks = listManager.getProjectTasks(currentProjectGroupID);
listDOM.updProjectTitle(listManager.getProject(currentProjectGroupID).title);

function updProjectTasksDOM() {
    projectTasks = listManager.getProjectTasks(currentProjectGroupID);
    listDOM.updProjectTitle(listManager.getProject(currentProjectGroupID).title);
    listDOM.displayTodo(projectTasks);
}

export function initSidebarEvents() {
    const sidebarProjects = document.querySelector('.sidebar-projects');
    const addProjectModal = document.querySelector('#add-project');
    const addProjectForm = document.querySelector('.add-project-form');
    const projectTitleInput = document.querySelector('.project-title');
    
    //handles project tasks display
    sidebarProjects.addEventListener('click', function(e) {
        const projectBtn = e.target.closest('.project-btn');
        if(!projectBtn) {
            return;
        }

        const currentGroupID = projectBtn.dataset.projectId;
        currentProjectGroupID = currentGroupID;
        updProjectTasksDOM();
    });

    //handles add project form reset
    addProjectModal.addEventListener('close', function(){
        addProjectForm.reset();
    });

    //handles add project form
    addProjectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const projectTitle = projectTitleInput.value;

        if(projectTitle === '') return;

        const newProjectID = listManager.createProject(projectTitle);

        const projects = listManager.getProjects();
        listDOM.displayProjects(projects, listManager.getDefaultProjectID());

        currentProjectGroupID = newProjectID;
        updProjectTasksDOM();

        addProjectModal.close();
        addProjectForm.reset();
    });

    //handles delete project btn
    sidebarProjects.addEventListener('click', function(e){
        const dltProjectBtn = e.target.closest('.dlt-project-btn');
        if(!(dltProjectBtn)) return;
        const projectID = dltProjectBtn.dataset.projectId;
        const projectTitle = listManager.getProject(projectID).title;
        const isConfirmed = confirm(`Delete ${projectTitle}? Deleting a project will delete all tasks inside the project, are you sure you want to delete?`);

        if (isConfirmed) {
            listManager.deleteProject(projectID);
            listDOM.displayProjects(listManager.getProjects(), listManager.getDefaultProjectID());
            if(projectID === currentProjectGroupID) {
                currentProjectGroupID = listManager.getDefaultProjectID();
                updProjectTasksDOM();
            };
        }
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
    //snapshot task modal values
    let originalTaskValues = {};
    
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
    const editTaskModal = document.querySelector('#edit-task');
    const editTaskForm = document.querySelector('.edit-task-form');
    const saveChangesBtn = document.querySelector('.save-edit-task');
    const editTaskFields = getTaskFields({
        title: '.edit-task-title',
        description: '.edit-task-description',
        duedate: '.edit-task-duedate',
        priority: '.edit-task-priority',
        note: '.edit-task-note'
    });

    //add task modal listeners
    //handles add task form submission, creates task
    addTaskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        listManager.createTask(
            addTaskFields.title.value, 
            addTaskFields.description.value, 
            addTaskFields.duedate.value, 
            Number(addTaskFields.priority.value), 
            addTaskFields.note.value, 
            currentProjectGroupID
        );
        
        updProjectTasksDOM();
        addTaskModal.close();
        addTaskForm.reset();
    });

    addTaskModal.addEventListener('close', function(){
        addTaskForm.reset();
    });
    //task card event listeners
    //handles task card dlt btn
    listWrapper.addEventListener('click', function(e) {
        const dltTaskBtn = e.target.closest('.dlt-task-btn');
        if(!(dltTaskBtn)) return;

        listManager.deleteTask(dltTaskBtn.dataset.taskId);
        updProjectTasksDOM();
    });

    //handles task card edit btn
    listWrapper.addEventListener('click', function(e) {
        const editTaskBtn = e.target.closest('.edit-task-btn');
        if(!(editTaskBtn)) return;

        const task = listManager.getTask(editTaskBtn.dataset.taskId);
        editTaskFields.title.value = task.title;
        editTaskFields.description.value = task.description;
        editTaskFields.duedate.value = task.dueDate;
        editTaskFields.priority.value = task.priority;
        editTaskFields.note.value = task.note;

        originalTaskValues = {
            ID: task.taskID,
            title: editTaskFields.title.value,
            description: editTaskFields.description.value,
            duedate: editTaskFields.duedate.value,
            priority: Number(editTaskFields.priority.value),
            note: editTaskFields.note.value
        };

        saveChangesBtn.disabled = true;
        editTaskModal.showModal();
    });
    //edit task modal listeners
    //handles edit form submission, updates task values
    editTaskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskID = originalTaskValues.ID;

        listManager.updateTaskTitle(taskID, editTaskFields.title.value);
        listManager.updateTaskDescription(taskID, editTaskFields.description.value);
        listManager.updateTaskDueDate(taskID, editTaskFields.duedate.value);
        listManager.updateTaskPriority(taskID, editTaskFields.priority.value);
        listManager.updateTaskNote(taskID, editTaskFields.note.value);

        updProjectTasksDOM();
        editTaskModal.close();
        editTaskForm.reset();
    });
    
    //handles edit modal saveChangebtn enabling/disabling
    editTaskForm.addEventListener('input', function() {
        const fieldChanged = editTaskFields.title.value !== originalTaskValues.title
        || editTaskFields.description.value !== originalTaskValues.description
        || editTaskFields.duedate.value !== originalTaskValues.duedate
        || Number(editTaskFields.priority.value) !== originalTaskValues.priority
        || editTaskFields.note.value !== originalTaskValues.note;   

        saveChangesBtn.disabled = !fieldChanged;
    });
    
    editTaskModal.addEventListener('close', function() {
        editTaskForm.reset();
    });
}