import './styles/reset.css';
import './styles/typography.css';
import './styles/main.css';
import { createTask, getTasks } from './todoList.js';

createTask('', 'bazalright', '', 'FLABABABABABABABALRIGHT', 'lets do this');
createTask('', 'bazinga', 'brudda', 'animal', 'sonion');
createTask();
console.log(createTask, {...getTasks()});

createTask('', 'bazinga too', 'brudda too ', 'animal too', 'let me out!');
console.log(getTasks());
createTask();