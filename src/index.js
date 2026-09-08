import './styles/reset.css';
import './styles/typography.css';
import './styles/main.css';
import * as listManager from './todoList.js';
import * as listDOM from './todoListDOM.js';
import * as listController from './todoListController.js'

const defaultProjectID = listManager.getDefaultProjectID();
const firstProjectID = listManager.createProject();
const firstTaskID = listManager.createTask(undefined, undefined, undefined, undefined, undefined, firstProjectID);
const secondTaskID = listManager.createTask();
const thirdtaskID = listManager.createTask(undefined, undefined, undefined, undefined, undefined, firstProjectID);
listManager.updateTaskTitle(firstTaskID, 'My first task');
listManager.updateTaskTitle(secondTaskID, 'My second task for today');
listManager.updateTaskNote(thirdtaskID, 'buzz alright')
console.log(listManager.getProjects(), listManager.getTasks());

//move first task to defualt project
listManager.updateTaskProjectGroup(firstTaskID, defaultProjectID);
console.log(listManager.getTasks());

//check tasks in default project
console.log(listManager.getProjectTasks(defaultProjectID));

listManager.deleteProject(firstProjectID);
console.log(listManager.getProjectTasks(defaultProjectID), listManager.getTasks(), listManager.getProjects());

listDOM.displayProjects(listManager.getProjects(), listManager.getDefaultProjectID());
listDOM.displayTodo(listManager.getProjectTasks(defaultProjectID));
listController.initSidebarEvents();
listController.initTodoListEvents();
listDOM.initDueRefresh();
