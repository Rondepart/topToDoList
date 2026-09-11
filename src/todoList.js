const tasks = {};
const projects = {};
let defaultProjectID;
const STORAGE_KEY = 'todoListData';

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
export function getProject(projectID) {
    if(!(checkProjectID(projectID))) return undefined;
    return structuredClone(projects[projectID]);
}
function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks, projects, defaultProjectID }));    
    } catch {
        
    }
}
function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;

        const parsed = JSON.parse(raw);
        Object.entries(parsed.tasks).forEach(([id, data]) => {
            tasks[id] = Object.assign(new Task(), data)
        });

        Object.entries(parsed.projects).forEach(([id, data]) => {
            projects[id] = Object.assign(new Project(), data)
        });

        defaultProjectID = parsed.defaultProjectID;
        console.log(parsed);
        return true;
    } catch {
        return false;
    }
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

    saveState();
    return taskID;
}

export function createProject(title = 'Untitled Proj') {
    const projectID = generateUID();

    title = validateStrProperty(title, 'Untitled Proj');

    const project = new Project(projectID, title);
    projects[projectID] = project;

    saveState();
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
    saveState();
}

export function deleteProject(projectID) {
    if (!(checkProjectID(projectID))) return;
    if (projectID === defaultProjectID) {
        console.log('Cannot delete default project');
        return;
    }

    Object.values(tasks).filter(task => task.projectGroupID === projectID).forEach(task => delete tasks[task.taskID]);
    delete projects[projectID];
    saveState();
}

export function updateTaskTitle(taskID, newTitle = 'Untitled') {
    if (!(checkTaskID(taskID))) return;
    newTitle = validateStrProperty(newTitle, 'Untitled');
    tasks[taskID].title = newTitle;
    saveState();
}

export function updateTaskDescription(taskID, newDesc = 'No Description') {
    if (!(checkTaskID(taskID))) return;
    newDesc = validateStrProperty(newDesc, 'No Description');
    tasks[taskID].description = newDesc;
    saveState();
}

export function updateTaskDueDate(taskID, newDueDate = 'No due date') {
    if (!(checkTaskID(taskID))) return;
    newDueDate = validateStrProperty(newDueDate, 'No due date');
    tasks[taskID].dueDate = newDueDate;
    saveState();
}

export function updateTaskPriority(taskID, newPriority = 0) {
    if (!(checkTaskID(taskID))) return;
    newPriority = validateNumProperty(newPriority, 0);
    tasks[taskID].priority = newPriority;
    saveState();
}

export function updateTaskNote(taskID, newNote = 'No notes') {
    if (!(checkTaskID(taskID))) return;
    newNote = validateStrProperty(newNote, 'No notes');
    tasks[taskID].note = newNote;
    saveState();
}

export function updateTaskProjectGroup(taskID, newProjectGroup = getDefaultProjectID()) {
    if (!(checkTaskID(taskID))) return;
    if (!(checkProjectID(newProjectGroup))) return;
    tasks[taskID].projectGroupID = newProjectGroup;
    saveState();
}

export function updateProjectTitle(projectID, newTitle = 'Untitled Proj') {
    if(!(checkProjectID(projectID))) return;
    newTitle = validateStrProperty(newTitle, 'Untitled Proj');
    projects[projectID].title = newTitle;
    saveState();
}

export function initProject() {
    if (loadState()) return;
    defaultProjectID = createProject('Uncategorized');
}

initProject();