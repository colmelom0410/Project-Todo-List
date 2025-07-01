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

// function that display all projects
function defaultDisplay(){
    removeContent();

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

const defaultBtn = document.querySelector('#defaultBtn');
const sideBarProjectBtns = document.querySelectorAll('.projectBtns');

function removeContent(){
    while (mainContent.hasChildNodes()){
        mainContent.removeChild(mainContent.firstChild);
    }
}

defaultBtn.addEventListener('click', ()=>{
    mainContent.classList.remove('projectSection');
    defaultDisplay();
});

sideBarProjectBtns.forEach(btn =>{
    btn.addEventListener('click', ()=>{
})
})

function displayProjects(projectName, tasks){
    removeContent();
    mainContent.classList.remove('defaultSection');
    mainContent.classList.add('projectSection');
    const sampleProject = new ProjectSection(projectName, tasks);
    const section = sampleProject.createSection();
    mainContent.appendChild(section);
    const tasksSection = document.querySelector('.tasksSection');
    
    sampleProject.tasks.forEach(task =>{
        const taskContent = new TaskCard(task);
        const displayTask = taskContent.createTaskCard();
        tasksSection.appendChild(displayTask);
    })

    return section;
}


const addProjectBtn = document.querySelector('#addProjectBtn');
const addProjectInput = document.querySelector('#addProjectInput');
const sideBarBtnContainer = document.querySelector('#sideBar>nav');


addProjectBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    const newProject = new Projects(addProjectInput.value);
    newProject.addTask(task1);
    newProject.addTask(task2);
    if(newProject.projectName !== ''){
        projectList.push(newProject);
        const newProjectBtn = document.createElement('button');
        newProjectBtn.classList.add('projectBtns');
        newProjectBtn.textContent = newProject.projectName;
        sideBarBtnContainer.appendChild(newProjectBtn);
        // displayProjects(newProject.projectName, newProject.tasks)
        const addTaskBtn = document.createElement('button');
        addTaskBtn.textContent = 'Add Task';
        addTaskBtn.id = "addTaskBtn";
        displayProjects(newProject.projectName, newProject.tasks).appendChild(addTaskBtn);
        newProjectBtn.addEventListener('click', ()=>{
            displayProjects(newProject.projectName, newProject.tasks).appendChild(addTaskBtn);
        })
    }
    addProjectInput.value = '';
    console.log(projectList);
})
