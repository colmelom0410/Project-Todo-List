import "./style.css";
import ProjectSection from "./projectSection";

const mainContent = document.querySelector('#mainContent');

class ProjectManager{
    constructor(){
        this.projects = [];
        this.currentProject = null;
    }

    addProject(project){
        this.projects.push(project);
    }

    removeProject(projectToRmv){
        this.projects = this.projects.filter(project => project !== projectToRmv);
    }
    setCurrentProject(project){
        this.currentProject = project;
    }
    getCurrentProject(){
        return this.currentProject;
    }
    getAllProjects(){
        return this.projects;
    }
}

const projectManager = new ProjectManager();

class Project{
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
        deleteProjectBtn.textContent = 'Delete';
        deleteProjectBtn.classList.add('deleteProjectBtn');
        deleteProjectBtn.addEventListener('click',()=>{
            projectDom.remove();
            const projectIndex = projectManager.getAllProjects().findIndex(proj => proj === project);
            if (projectIndex !== -1) {
                projectManager.getAllProjects().splice(projectIndex, 1);
                const projectSidebarBtn = document.querySelectorAll(`.projectBtns`);
                if (projectSidebarBtn[projectIndex]) {
                    projectSidebarBtn[projectIndex].remove();
                }
              }
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
    constructor(task, project) {
        this.task = task;
        this.project = project;
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
        
        const taskFooter = document.createElement('div');
        taskFooter.classList.add('taskFooter');

        taskBtnsDiv.appendChild(this.editTask(task, this.task));
        taskBtnsDiv.appendChild(this.completeTask(taskTitle, taskFooter, this.task));
        taskBtnsDiv.appendChild(this.deleteTask(task, this.task));

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

    deleteTask(taskDom,taskList){
        const deleteTaskBtn = document.createElement('button');
        deleteTaskBtn.textContent = 'Delete';
        deleteTaskBtn.classList.add('deleteTaskBtn');
        deleteTaskBtn.addEventListener('click',()=>{
            taskDom.remove();
            console.log(this.project.tasks);
            const taskIndex = this.project.tasks.findIndex(todo => todo === taskList);
            console.log(taskIndex);
            if (taskIndex !== -1) {
                this.project.tasks.splice(taskIndex, 1);
              }
        })
        return deleteTaskBtn;
    }

    completeTask(header, footer, taskList){    
        const completeTaskBtn = document.createElement('button');
        completeTaskBtn.textContent = "Mark as Complete";
        completeTaskBtn.classList.add('completeTaskBtn');
        completeTaskBtn.addEventListener('click', ()=>{
            const taskIndex = this.project.tasks.findIndex(todo => todo === taskList);
            console.log(taskIndex);
            if (taskIndex !== -1) {
                this.project.tasks.splice(taskIndex, 1);
                this.project.tasks.push(taskList);
              }
            this.task.urgency = "completed";
            this.updateTaskColor(header, footer);
        })

        return completeTaskBtn;
    }

    editTask(taskDom, taskList){
        const editTaskBtn = document.createElement('button');
        editTaskBtn.textContent = "Edit";
        editTaskBtn.classList.add('editTaskBtn');
        editTaskBtn.addEventListener('click', ()=>{
            taskDialog.showModal();
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
                taskTitle.classList.toggle("completed");
                taskFooter.classList.toggle("completed");
                break;
        }
    }
}


console.log(projectManager.getAllProjects())

function renderDisplay(tasks, container, project){
    tasks.forEach(task =>{
        const taskContent = new TaskCard(task, project);
        const displayTask = taskContent.createTaskCard();
        container.appendChild(displayTask);

    })
}

// function that display all projects
function defaultDisplay(){
    removeContent();
    mainContent.classList.add('defaultSection');
    projectManager.getAllProjects().forEach(project => {
        const projectContent = new ProjectCard(project);
        const displayProject = projectContent.createProjectCard(mainContent);
        renderDisplay(project.tasks, displayProject, project);
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

    renderDisplay(sampleProject.tasks, tasksSection, sampleProject);
    
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


addTodo.addEventListener('click', (e)=>{
    e.preventDefault();
    const current = projectManager.getCurrentProject();
    if(!taskTitle.value||!taskDueDate.value||!taskDesc.value){
        alert("input values to all fields");
        return;
      }
    if (!taskUrgency.value) {
        alert("Please select urgency");
        return;
    }
    if (current) {
        const NewTask = new Task(
            taskTitle.value,
            taskDueDate.value,
            taskDesc.value,
            taskUrgency.value
        );
        current.addTask(NewTask);
        displayProjects(current.projectName, current.tasks);
    }

    taskDialog.close();
    clearTaskForm();

    renderProjectWithAddButton(current)

})

cancelTodo.addEventListener('click',(e)=>{
    e.preventDefault();
    clearTaskForm();
    taskDialog.close();
})

function createNewProject(projectName){
    const newProject = new Project(projectName);
    return newProject;
}

function createNewProjectBtn(newProject){
    const newProjectBtn = document.createElement('button');
    newProjectBtn.classList.add('projectBtns');
    newProjectBtn.textContent = newProject.projectName;
    // newProjectBtn.id = `sideBarBtn${newProject.projectName}`;

    return newProjectBtn;
}


function renderProjectWithAddButton(project) {
    projectManager.setCurrentProject(project);
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
    const projectName = addProjectInput.value.trim();
    
    if(!projectName) return;
    
    const newProject = createNewProject(projectName);
    projectManager.addProject(newProject);
    projectManager.setCurrentProject(newProject);

    const newProjectBtn = createNewProjectBtn(newProject);
    sideBarBtnContainer.appendChild(newProjectBtn);
    
    newProjectBtn.addEventListener('click', ()=>{
        projectManager.setCurrentProject(newProject);
        renderProjectWithAddButton(newProject);
    })

    renderProjectWithAddButton(newProject);

    addProjectInput.value = '';
    console.log(projectManager.getAllProjects());
})


