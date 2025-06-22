import "./style.css";
import ProjectSection from "./projectSection";

const mainContent = document.querySelector('#mainContent');
const projectList = [];

class Projects{
    constructor(projectName){
        this.projectName = projectName
        this.tasks = [];
    }

    addTask(task){
        this.tasks.push(task);
    }
}

class ProjectCard{
    constructor(project){
        this.project = project;
    }

    createProjectCard(container){
        const projects = document.createElement('div');
        projects.classList.add("projects");
        const projectTitle = document.createElement('div');
        projectTitle.textContent = this.project.projectName;
        const projectContent = document.createElement('div');
        projectTitle.classList.add("projectTitle");
        projectContent.classList.add("projectContents");

        projects.appendChild(projectTitle);
        projects.appendChild(projectContent);
        container.appendChild(projects);

        return projectContent;
    }
}

class Task {
    constructor(taskTitle, dueDate, taskDesc) {
        this.taskTitle = taskTitle;
        this.dueDate = dueDate;
        this.taskDesc = taskDesc;
    }
}

class TaskCard {
    constructor(task) {
        this.task = task;
    }

    createTaskCard() {
        const task = document.createElement('div');
        task.classList.add('tasks');

        const taskTitle = document.createElement('div');
        taskTitle.textContent = this.task.taskTitle;
        taskTitle.classList.add('taskTitle');

        const taskContent = document.createElement('div');
        taskContent.classList.add('taskContent');

        const dueDate = document.createElement('h5');
        dueDate.textContent = this.task.dueDate;

        const taskDescription = document.createElement('div');
        taskDescription.classList.add('sample');
        taskDescription.textContent = this.task.taskDesc;

        taskContent.appendChild(dueDate);
        taskContent.appendChild(taskDescription);

        const taskFooter = document.createElement('div');
        taskFooter.classList.add('taskFooter');

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = '+';

        toggleBtn.addEventListener('click', () => {
            taskContent.classList.toggle('expanded');
            toggleBtn.textContent = toggleBtn.textContent === '+' ? '-' : '+';
        });

        taskFooter.appendChild(toggleBtn);

        task.appendChild(taskTitle);
        task.appendChild(taskContent);
        task.appendChild(taskFooter);

        return task;
    }
}




const project1 = new Projects("Project1");
const task1 = new Task("title1","Due Date", "content1");
const task2 = new Task("title1","Due Date", "content1");
const project2 = new Projects("Project2");
const task21 = new Task("title1","Due Date", "content1");
const task22 = new Task("title1","Due Date", "content1");

project1.addTask(task1);
project1.addTask(task2);
projectList.push(project1);
project2.addTask(task21);
project2.addTask(task22);
projectList.push(project2);

console.log(projectList)

function defaultDisplay(){
    mainContent.classList.add('defaultSection');
    projectList.forEach(project => {
        const projectContent = new ProjectCard(project);
        const displayProject = projectContent.createProjectCard(mainContent);
        project.tasks.forEach(task =>{
            const taskContent = new TaskCard(task);
            const displayTask = taskContent.createTaskCard();
            displayProject.appendChild(displayTask);
    
        })
    });
}

defaultDisplay();


const sampleBtn = document.querySelector('#sampleBtn');
const defaultBtn = document.querySelector('#defaultBtn');

function removeContent(){
    while (mainContent.hasChildNodes()){
        mainContent.removeChild(mainContent.firstChild);
    }
}

defaultBtn.addEventListener('click', ()=>{
    removeContent();
    mainContent.classList.remove('projectSection');
    defaultDisplay();
});

sampleBtn.addEventListener('click', ()=>{
    removeContent();
    mainContent.classList.remove('defaultSection');
    mainContent.classList.add('projectSection');
    const sampleProject = new ProjectSection(project1.projectName, project1.tasks);
    const section = sampleProject.createSection();
    mainContent.appendChild(section);
    const tasksSection = document.querySelector('.tasksSection');
    
    sampleProject.tasks.forEach(task =>{
        const taskContent = new TaskCard(task);
        const displayTask = taskContent.createTaskCard();
        tasksSection.appendChild(displayTask);
    })

    
})