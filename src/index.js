import "./style.css";
import ProjectSection from "./projectSection";

const mainContent = document.querySelector('#mainContent');
const projectList = [];

class Projects{
    constructor(projectName, tasks = []){
        this.projectName = projectName
        this.tasks = tasks;
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
        projectTitle.appendChild(this.deleteProject(projects, this.project))

        const projectContent = document.createElement('div');
        projectTitle.classList.add("projectTitle");
        projectContent.classList.add("projectContents");

        projects.appendChild(projectTitle);
        projects.appendChild(projectContent);
        container.appendChild(projects);

        return projectContent;
    }

    deleteProject(projectDom, project){
        const deleteProjectBtn = document.createElement('button');
        deleteProjectBtn.classList.add('deleteProjectBtn');
        const projectSidebarBtn = document.querySelector(`#sideBarBtn${project.projectName}`);
        deleteProjectBtn.textContent = 'Delete';
        deleteProjectBtn.classList.add('deleteProjectBtn');
        deleteProjectBtn.addEventListener('click',()=>{
            projectDom.remove();
            sideBarBtnContainer.removeChild(projectSidebarBtn);
            console.log(project);
            const projectIndex = projectList.findIndex(proj => proj === project);
            console.log(projectIndex);
            if (projectIndex !== -1) {
                projectList.splice(projectIndex, 1);
              }
            console.log(projectList);
        })
        return deleteProjectBtn;
    }
}

class Task {
    constructor(taskTitle, dueDate, taskDesc, urgency) {
        this.taskTitle = taskTitle;
        this.dueDate = dueDate;
        this.taskDesc = taskDesc;
        this.urgency = urgency;
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
        dueDate.textContent = `Due Date: ${this.task.dueDate}`;

        const taskDescription = document.createElement('div');
        taskDescription.classList.add('textField');
        taskDescription.textContent = this.task.taskDesc;

        taskContent.appendChild(dueDate);
        taskContent.appendChild(taskDescription); 

        const taskBtnsDiv = document.createElement('div');
        taskBtnsDiv.classList.add('taskBtnsDiv');
        taskBtnsDiv.appendChild(this.editTask(task, this.task));
        taskBtnsDiv.appendChild(this.completeTask(task));
        taskBtnsDiv.appendChild(this.deleteTask(task, this.task));

        const taskFooter = document.createElement('div');
        taskFooter.classList.add('taskFooter');

        this.updateTaskColor(taskTitle, taskFooter);

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = '+';

        toggleBtn.addEventListener('click', () => {
            taskContent.classList.toggle('expanded');
            toggleBtn.textContent = toggleBtn.textContent === '+' ? '-' : '+';
        });

        taskFooter.appendChild(toggleBtn);

        task.appendChild(taskTitle);
        task.appendChild(taskContent);
        taskContent.appendChild(taskBtnsDiv);
        task.appendChild(taskFooter);

        return task;
    }

    deleteTask(taskDom,TaskList){
        const deleteTaskBtn = document.createElement('button');
        deleteTaskBtn.textContent = 'Delete';
        deleteTaskBtn.classList.add('deleteTaskBtn');
        deleteTaskBtn.addEventListener('click',()=>{
            taskDom.remove();
            console.log(currentProject.tasks);
            const taskIndex = currentProject.tasks.findIndex(todo => todo === TaskList);
            console.log(taskIndex);
            if (taskIndex !== -1) {
                currentProject.tasks.splice(taskIndex, 1);
              }
        })
        return deleteTaskBtn;
    }

    completeTask(task){
        const completeTaskBtn = document.createElement('button');
        completeTaskBtn.textContent = "Mark as Complete";
        completeTaskBtn.classList.add('completeTaskBtn');
        completeTaskBtn.addEventListener('click', ()=>{
            console.log(`${task} Completed`)
        })

        return completeTaskBtn;
    }

    editTask(taskDom, taskList){
        const editTaskBtn = document.createElement('button');
        editTaskBtn.textContent = "Edit";
        editTaskBtn.classList.add('editTaskBtn');
        editTaskBtn.addEventListener('click', ()=>{
            console.log(`Task Succesfully Edited`)
        })
        
        return editTaskBtn;
    }

    updateTaskColor(taskTitle, taskFooter){
        switch(this.task.urgency){
            case "high":
                taskTitle.classList.add("high");
                taskFooter.classList.add("high");
                break;
            case "medium":
                taskTitle.classList.add("medium");
                taskFooter.classList.add("medium");
                break;
            case "low":
                taskTitle.classList.add("low");
                taskFooter.classList.add("low");
                break;
            default:
                taskTitle.classList.add("completed");
                taskFooter.classList.add("completed");
        }
    }
}


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


function removeContent(){
    while (mainContent.hasChildNodes()){
        mainContent.removeChild(mainContent.firstChild);
    }
}

defaultBtn.addEventListener('click', ()=>{
    mainContent.classList.remove('projectSection');
    defaultDisplay();
});

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

const taskDialog = document.querySelector('#taskDialog');
const addTodo = document.querySelector('#addTodo');
const cancelTodo = document.querySelector('#cancelTodo');

const taskTitle = document.querySelector('#taskTitle');
const taskDueDate = document.querySelector('#taskDueDate');
const taskUrgency = document.querySelector('#urgency');
const taskDesc = document.querySelector('#taskDesc');

let currentProject = null;

addTodo.addEventListener('click', (e)=>{
    e.preventDefault();
    if(!taskTitle.value||!taskDueDate.value||!taskDesc.value){
        alert("input values to all fields");
        return;
      }
    if (!taskUrgency.value) {
        alert("Please select urgency");
        return;
    }
    if (currentProject) {
        const NewTask = new Task(
            taskTitle.value,
            taskDueDate.value,
            taskDesc.value,
            taskUrgency.value
        );
        currentProject.addTask(NewTask);
        displayProjects(currentProject.projectName, currentProject.tasks);
    }

    taskDialog.close();
    clearTaskForm();

    renderProjectWithAddButton(currentProject)

})

cancelTodo.addEventListener('click',(e)=>{
    e.preventDefault();
    clearTaskForm();
    taskDialog.close();
})

function createNewProject(projectName){
    const newProject = new Projects(projectName);
    return newProject;
}

function createNewProjectBtn(newProject){
    const newProjectBtn = document.createElement('button');
    newProjectBtn.classList.add('projectBtns');
    newProjectBtn.textContent = newProject.projectName;
    newProjectBtn.id = `sideBarBtn${newProject.projectName}`;

    return newProjectBtn;
}


function renderProjectWithAddButton(project) {
    currentProject = project;
    const container = displayProjects(project.projectName, project.tasks);

    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = 'Add Task';
    addTaskBtn.classList.add("addTaskBtn");

    container.appendChild(addTaskBtn);
    addTaskBtn.addEventListener('click', ()=>{
        taskDialog.showModal();
    })
}


function clearTaskForm() {
    taskTitle.value = '';
    taskDueDate.value = '';
    taskUrgency.value = '';
    taskDesc.value = '';
}

addProjectBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    const newProject = createNewProject(addProjectInput.value);
    
    if(newProject.projectName === ''){
        return
    }
    projectList.push(newProject);
    const newProjectBtn = createNewProjectBtn(newProject);
    sideBarBtnContainer.appendChild(newProjectBtn);
    
    newProjectBtn.addEventListener('click', ()=>{
        currentProject = newProject;
        renderProjectWithAddButton(newProject);
    })

    renderProjectWithAddButton(newProject);

    addProjectInput.value = '';
    console.log(projectList);
})


