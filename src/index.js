import './styles/reset.css';
import './styles/typography.css';
import './styles/main.css';
import * as listManager from './todoList.js';

const firstTaskID = listManager.createTask();
const secondTaskID = listManager.createTask();
console.log(structuredClone(listManager.getTasks()));

listManager.updateTaskDescription(firstTaskID, '          I edited the goddanm description              ');
console.log(structuredClone(listManager.getTasks()));


listManager.updateTaskNote(firstTaskID, '                  Note: do be sure to not be late');
console.log(structuredClone(listManager.getTasks()))

listManager.updateTaskDescription(secondTaskID, 'SECOND task description, bazalright                          ')
listManager.deleteTask(firstTaskID);
console.log(structuredClone(listManager.getTasks()));