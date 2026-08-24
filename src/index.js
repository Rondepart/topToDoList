import './styles/reset.css';
import './styles/typography.css';
import './styles/main.css';
import * as listManager from './todoList.js';

const firstTaskID = listManager.createTask();
const secondTaskID = listManager.createTask();
const firstProjectID = listManager.createProject();
console.log(structuredClone(listManager.getTasks()), structuredClone(listManager.getProjects()));

listManager.updateTaskDescription(firstTaskID, '          I edited the goddanm description              ');
listManager.updateProjectTitle(firstProjectID, ' JIM JIMMY JOGOES ????????????????                     ');
console.log(structuredClone(listManager.getTasks()), structuredClone(listManager.getProjects()));


listManager.updateTaskNote(firstTaskID, '                  Note: do be sure to not be late');
listManager.updateProjectTitle(firstProjectID, '             maybe later !!!       ');
console.log(structuredClone(listManager.getTasks()))

listManager.updateTaskDescription(secondTaskID, 'SECOND task description, bazalright                          ')
listManager.deleteTask(firstTaskID);
listManager.deleteProject(firstProjectID);
console.log(structuredClone(listManager.getTasks()), structuredClone(listManager.getProjects()));