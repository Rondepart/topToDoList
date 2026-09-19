import './styles/reset.css';
import './styles/typography.css';
import './styles/color.css';
import './styles/main.css';
import * as listManager from './todoList.js';
import * as listDOM from './todoListDOM.js';
import * as listController from './todoListController.js'

listDOM.displayProjects(listManager.getProjects(), listManager.getDefaultProjectID());
listDOM.displayTodo(listManager.getProjectTasks(listManager.getDefaultProjectID()));
listController.initSidebarEvents();
listController.initTodoListEvents();
listDOM.initDueRefresh();