import './styles/reset.css';
import './styles/typography.css';
import './styles/main.css';
import * as listManager from './todoList.js';

const firstTaskID = listManager.createTask();
console.log(structuredClone(listManager.getTasks()));

listManager.updateTaskDescription(firstTaskID, 'I edited the goddanm description');
console.log(structuredClone(listManager.getTasks()));

listManager.deleteTask(firstTaskID);
console.log(structuredClone(listManager.getTasks()));