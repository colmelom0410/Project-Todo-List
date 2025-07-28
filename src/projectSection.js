import "./projectSectionStyle.css";

export default class ProjectSection {
    constructor(projectName, tasks) {
        this.projectName = projectName;
        this.tasks = tasks;
    }

    createSection() {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('projectDiv');

        // Header
        const projectHeader = document.createElement('h2');
        projectHeader.classList.add('projectHeader');
        projectHeader.textContent = this.projectName;

        // Active tasks section
        const tasksSection = document.createElement('div');
        tasksSection.classList.add('tasksSection');

        // Completed tasks section
        const completedTasksSection = document.createElement('div');
        completedTasksSection.classList.add('completedTasksSection');

        const completedHeader = document.createElement('h3');
        completedHeader.textContent = "Completed Tasks";
        completedHeader.classList.add('completedHeader');

        completedTasksSection.appendChild(completedHeader);

        // Store references
        this.tasksSection = tasksSection;
        this.completedTasksSection = completedTasksSection;

        // Append
        projectDiv.appendChild(projectHeader);
        projectDiv.appendChild(tasksSection);
        projectDiv.appendChild(completedTasksSection);

        return projectDiv;
    }
}
