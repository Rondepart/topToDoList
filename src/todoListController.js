import * as listManager from './todoList.js';
import * as listDOM from './todoListDOM.js';

export function initSidebarEvents() {
    const sidebarProjects = document.querySelector('.sidebar-projects');
    const addProjectModal = document.querySelector('#add-project');
    const addProjectForm = document.querySelector('.add-project-form');
    const projectTitleInput = document.querySelector('.project-title');

    sidebarProjects.addEventListener('click', function(e) {
        const projectBtn = e.target.classList.contains('project-btn');
        if(!projectBtn) {
            console.log('You did not click a project button');
            return;
        }

        const projectTasks = listManager.getProjectTasks(e.target.dataset.projectId);
        listDOM.displayTodo(projectTasks);
    });

    addProjectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const projectTitle = projectTitleInput.value;

        if(projectTitle === '') return;

        listManager.createProject(projectTitle);

        const projects = listManager.getProjects();
        listDOM.displayProjects(projects);

        addProjectModal.close();
    });
}