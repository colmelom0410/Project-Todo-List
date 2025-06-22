
import "./projectSectionStyle.css"

export default class ProjectSection{
    constructor(projectName, tasks){
        this.projectName = projectName;
        this.tasks = tasks;
    }

    createSection(){
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('projectDiv');

        const projectHeader = document.createElement('h2');
        projectHeader.classList.add('projectHeader');
        projectHeader.textContent = this.projectName;

        const tasksSection = document.createElement('div');
        tasksSection.classList.add('tasksSection');

        projectDiv.appendChild(projectHeader);
        projectDiv.appendChild(tasksSection);
        return projectDiv;
    }
}