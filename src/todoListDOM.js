export function displayProjects(projects) {
    const sidebarProject = document.querySelector('.sidebar-projects');
    sidebarProject.innerHTML = '';

    Object.values(projects).forEach(project => {
        const projectListItem = document.createElement('li');
        const projectBtn = document.createElement('button');

        projectBtn.classList.add('project-btn');
        projectBtn.dataset.projectId = project.projectID;
        projectBtn.textContent = project.title;

        projectListItem.appendChild(projectBtn);
        sidebarProject.appendChild(projectListItem);
    });
}