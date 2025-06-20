import "./style.css";

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

class ProjectCard extends Projects{
    constructor(projectName, tasks){
        super(projectName, tasks);
    }

    createProjectCard(){
        const projects = document.createElement('div');
        projects.classList.add("projects");
        const projectTitle = document.createElement('div');
        projectTitle.textContent = this.projectName;
        const projectContent = document.createElement('div');
        projectTitle.classList.add("projectTitle");
        projectContent.classList.add("projectContents");

        projects.appendChild(projectTitle);
        projects.appendChild(projectContent);
        mainContent.appendChild(projects);

        return projectContent;
    }
}

class Task{
    constructor(taskTitle, dueDate, taskDesc){
        this.taskTitle = taskTitle;
        this.dueDate = dueDate;
        this.taskDesc = taskDesc;
    }
}

class TaskCard extends Task{
    constructor(taskTitle, dueDate, taskDesc){
        super(taskTitle, dueDate, taskDesc)
    }

    createTaskCard(){
        const task = document.createElement('div');
        task.classList.add('tasks');
        const taskTitle = document.createElement('div');
        taskTitle.textContent = this.taskTitle;
        taskTitle.classList.add('taskTitle');
        const taskContent = document.createElement('div');
        taskContent.classList.add('taskContent');

        const dueDate = document.createElement('h5');
        dueDate.textContent = this.dueDate;
        const taskDescription = document.createElement('div');
        taskDescription.classList.add('sample');
        taskDescription.textContent = this.taskDesc;
        taskContent.appendChild(dueDate);
        taskContent.appendChild(taskDescription);

        const taskFooter = document.createElement('div');
        taskFooter.classList.add('taskFooter');
        const taskFooterBtn = document.createElement('button');
        taskFooterBtn.textContent = "+";
        taskFooter.appendChild(taskFooterBtn);

        task.appendChild(taskTitle);
        task.appendChild(taskContent);
        task.appendChild(taskFooter);

        taskFooterBtn.addEventListener('click',()=>{
        if(taskFooterBtn.textContent === '+'){
            taskContent.classList.add('expanded');
            taskFooterBtn.textContent = '-';
        }
        else{
            taskContent.classList.remove('expanded');
            taskFooterBtn.textContent = '+';
        }
        })

        return task;
    }
}



const project1 = new ProjectCard("Project1");
const task1 = new TaskCard("title1","Due Date", "content1");
const task2 = new TaskCard("title1","Due Date", "content1");
const project2 = new ProjectCard("Project2");
const task21 = new TaskCard("title1","Due Date", "content1");
const task22 = new TaskCard("title1","Due Date", "content1");

project1.addTask(task1);
project1.addTask(task2);
projectList.push(project1);
project2.addTask(task21);
project2.addTask(task22);
projectList.push(project2);

console.log(projectList)

projectList.forEach(project => {
    const projectContent = project.createProjectCard();
    project.tasks.forEach(task =>{
        const taskContent = task.createTaskCard();
        projectContent.appendChild(taskContent);

    })
});