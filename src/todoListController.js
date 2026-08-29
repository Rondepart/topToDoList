import * as listManager from './todoList.js';
import * as listDOM from './todoListDOM.js';

export function initSidebarEvents() {
    const sidebarProjects = document.querySelector('.sidebar-projects');

    sidebarProjects.addEventListener('click', function(e) {
        if(!e.target.classList.contains('project-btn')) {
            console.log('You did not click a project button');
        }
        listDOM.displayTodo(listManager.getProjectTasks(e.target.dataset.projectId));
    });
}