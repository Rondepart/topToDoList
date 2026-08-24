const tasks = {};
const projects = {};

export const getTasks = () => tasks;
export const getProjects = () => projects;

class Task {
    constructor(taskID, title, description, dueDate, priority, note) {
        this.taskID = taskID;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.note = note;
    }
}

class Project {
    constructor(projectID, title) {
        this.projectID = projectID;
        this.title = title;
    }
}

//handle task string validation
function validateTaskStrProperty(property, fallback) {
    property = property.trim();
    property = property === '' ? fallback : property;
    return property;
}

//handles task number validation
function validateTaskNumProperty(property, fallback) {
    property = property !== Number(property) ? fallback : property;
    return property;
}

export function createTask(title = 'Untitled', description = 'No Description', dueDate = 'No due date', priority = 0, note = 'No notes') {
    let taskID = crypto.randomUUID();

    //checks if taskID is duped, regen task ID if it is
    while(taskID in tasks) {
        taskID = crypto.randomUUID();
    }

    title = validateTaskStrProperty(title, 'Untitled');
    description = validateTaskStrProperty(description, 'No Description');
    dueDate = validateTaskStrProperty(dueDate, 'No due date');
    priority = validateTaskNumProperty(priority, 0);
    note = validateTaskStrProperty(note, 'No notes');

    const task = new Task(taskID, title, description, dueDate, priority, note);
    tasks[taskID] = task;

    return taskID;
}

export function createProject(title = 'Untitled Proj') {
    let projectID = crypto.randomUUID();

    while(projectID in projects) {
        projectID = crypto.randomUUID();
    }

    title = validateTaskStrProperty(title, 'Untitled Proj');

    const project = new Project(projectID, title);
    projects[projectID] = project;

    return projectID;
}

//guard returns true if taskID is in tasks
export function checkTaskID(taskID) {
    return taskID in tasks;
}

export function deleteTask(taskID) {
    if (!(checkTaskID(taskID))) return;
    delete tasks[taskID];
}

export function updateTaskTitle(taskID, newTitle = 'Untitled') {
    if (!(checkTaskID(taskID))) return;
    newTitle = validateTaskStrProperty(newTitle, 'Untitled');
    tasks[taskID].title = newTitle;
}

export function updateTaskDescription(taskID, newDesc = 'No Description') {
    if (!(checkTaskID(taskID))) return;
    newDesc = validateTaskStrProperty(newDesc, 'No Description');
    tasks[taskID].description = newDesc;
}

export function updateTaskDueDate(taskID, newDueDate = 'No due date') {
    if (!(checkTaskID(taskID))) return;
    newDueDate = validateTaskStrProperty(newDueDate, 'No due date');
    tasks[taskID].dueDate = newDueDate;
}

export function updateTaskPriority(taskID, newPriority = 0) {
    if (!(checkTaskID(taskID))) return;
    newPriority = validateTaskNumProperty(newPriority, 0);
    tasks[taskID].priority = newPriority;
}

export function updateTaskNote(taskID, newNote = 'No notes') {
    if (!(checkTaskID(taskID))) return;
    newNote = validateTaskStrProperty(newNote, 'No notes');
    tasks[taskID].note = newNote;
}