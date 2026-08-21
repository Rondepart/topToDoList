const tasks = {};

const getTasks = () => tasks;

class Task {
    constructor(taskID, title, description, dueDate, priority, note) {
    this.taskID = taskID;
    this.title = title;
    this.content = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.note = note;
    }
}

function createTask(title = 'Untitled', description = 'No Description', dueDate = 'No Due Date', priority = 0, note = 'No notes') {
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
}

export {createTask, getTasks};