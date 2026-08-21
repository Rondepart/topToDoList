const tasks = {};

export const getTasks = () => tasks;

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

export function createTask(title = 'Untitled', description = 'No Description', dueDate = 'No due date', priority = 0, note = 'No notes') {
    let taskID = crypto.randomUUID();

    //checks if taskID is duped, regen task ID if it is
    while(taskID in tasks) {
        taskID = crypto.randomUUID();
    }

    //checks for empty strings, prio checks if a number is passed
    title = title === '' ? 'Untitled' : title;
    description = description === '' ? 'No description' : description;
    dueDate = dueDate === '' ? 'No due date' : dueDate;
    priority = priority !== Number(priority) ? 0 : priority;
    note = note === '' ? 'No notes' : note;

    const task = new Task(taskID, title, description, dueDate, priority, note);
    tasks[taskID] = task;

    return taskID;
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
    tasks[taskID].title = newTitle;
}

export function updateTaskDescription(taskID, newDesc = 'No Desc') {
    if (!(checkTaskID(taskID))) return;
    tasks[taskID].description = newDesc;
}

export function updateTaskDueDate(taskID, newDueDate = 'No due date') {
    if (!(checkTaskID(taskID))) return;
    tasks[taskID].dueDate = newDueDate;
}

export function updateTaskPriority(taskID, newPriority = 0) {
    if (!(checkTaskID(taskID))) return;
    tasks[taskID].priority = newPriority;
}

export function updateTaskNote(taskID, newNote = 'No notes') {
    if (!(checkTaskID(taskID))) return;
    tasks[taskID].note = newNote;
}