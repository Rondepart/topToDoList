const tasks = {};
const projects = {};
let defaultProjectID;

export const getDefaultProjectID = () => structuredClone(defaultProjectID);
export const getTasks = () => structuredClone(tasks);
export const getProjects = () => structuredClone(projects);
export function getProjectTasks(projectID) {
    if(!(checkProjectID(projectID))) return [];
    return structuredClone(Object.values(tasks).filter(task => task.projectGroupID === projectID));
}
export function getTask(taskID) {
    if(!(checkTaskID(taskID))) return undefined;
    return structuredClone(tasks[taskID]);
}

class Task {
    constructor(taskID, title, description, dueDate, priority, note, projectGroupID) {
        this.taskID = taskID;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.note = note;
        this.projectGroupID = projectGroupID;
    }
}

class Project {
    constructor(projectID, title) {
        this.projectID = projectID;
        this.title = title;
    }
}

//handle task string validation
function validateStrProperty(property, fallback) {
    if (typeof property !== 'string') return fallback;
    property = property.trim();
    return property === '' ? fallback : property;
}

//handles task number validation
function validateNumProperty(property, fallback) {
    property = Number(property);
    return Number.isNaN(property) ? fallback : property;
}

function generateUID() {
    let uid = crypto.randomUUID();

    //reset if uid is used
    while(uid in tasks || uid in projects) {
        uid = crypto.randomUUID();
    }

    return uid;
}

export function createTask(title = 'Untitled', description = 'No Description', dueDate = 'No due date', 
priority = 0, note = 'No notes', projectGroupID = defaultProjectID) {
    if(!(checkProjectID(projectGroupID))) {
        projectGroupID = defaultProjectID;
    }

    const taskID = generateUID();

    title = validateStrProperty(title, 'Untitled');
    description = validateStrProperty(description, 'No Description');
    dueDate = validateStrProperty(dueDate, 'No due date');
    priority = validateNumProperty(priority, 0);
    note = validateStrProperty(note, 'No notes');

    const task = new Task(taskID, title, description, dueDate, priority, note, projectGroupID);
    tasks[taskID] = task;

    return taskID;
}

export function createProject(title = 'Untitled Proj') {
    const projectID = generateUID();

    title = validateStrProperty(title, 'Untitled Proj');

    const project = new Project(projectID, title);
    projects[projectID] = project;

    return projectID;
}

//guard returns true if taskID is in tasks
function checkTaskID(taskID) {
    return taskID in tasks;
}

function checkProjectID(projectID) {
    return projectID in projects;
}

export function deleteTask(taskID) {
    if (!(checkTaskID(taskID))) return;
    delete tasks[taskID];
}

export function deleteProject(projectID) {
    if (!(checkProjectID(projectID))) return;
    if (projectID === defaultProjectID) {
        console.log('Cannot delete default project');
        return;
    }

    Object.values(tasks).filter(task => task.projectGroupID === projectID).forEach(task => delete tasks[task.taskID]);
    delete projects[projectID];
}

export function updateTaskTitle(taskID, newTitle = 'Untitled') {
    if (!(checkTaskID(taskID))) return;
    newTitle = validateStrProperty(newTitle, 'Untitled');
    tasks[taskID].title = newTitle;
}

export function updateTaskDescription(taskID, newDesc = 'No Description') {
    if (!(checkTaskID(taskID))) return;
    newDesc = validateStrProperty(newDesc, 'No Description');
    tasks[taskID].description = newDesc;
}

export function updateTaskDueDate(taskID, newDueDate = 'No due date') {
    if (!(checkTaskID(taskID))) return;
    newDueDate = validateStrProperty(newDueDate, 'No due date');
    tasks[taskID].dueDate = newDueDate;
}

export function updateTaskPriority(taskID, newPriority = 0) {
    if (!(checkTaskID(taskID))) return;
    newPriority = validateNumProperty(newPriority, 0);
    tasks[taskID].priority = newPriority;
}

export function updateTaskNote(taskID, newNote = 'No notes') {
    if (!(checkTaskID(taskID))) return;
    newNote = validateStrProperty(newNote, 'No notes');
    tasks[taskID].note = newNote;
}

export function updateTaskProjectGroup(taskID, newProjectGroup = getDefaultProjectID()) {
    if (!(checkTaskID(taskID))) return;
    if (!(checkProjectID(newProjectGroup))) return;
    tasks[taskID].projectGroupID = newProjectGroup;
}

export function updateProjectTitle(projectID, newTitle = 'Untitled Proj') {
    if(!(checkProjectID(projectID))) return;
    newTitle = validateStrProperty(newTitle, 'Untitled Proj');
    projects[projectID].title = newTitle;
}

export function initProject() {
    if(Object.keys(projects).length === 0) {   
        defaultProjectID = createProject('Uncategorized');
    }
}

initProject();