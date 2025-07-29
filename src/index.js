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

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(task, project) {
        project.addTask(task);
        this.tasks.push({ task, project });
    }

    deleteTask(task, project) {
        const index = project.tasks.findIndex(t => t === task);
        if (index !== -1) {
            project.tasks.splice(index, 1);
        }

        this.tasks = this.tasks.filter(t => t.task !== task);
    }

    editTask(oldTask, updatedTaskData) {
        oldTask.taskTitle = updatedTaskData.taskTitle;
        oldTask.dueDate = updatedTaskData.dueDate;
        oldTask.taskDesc = updatedTaskData.taskDesc;
        oldTask.urgency = updatedTaskData.urgency;
    }

    getAllTasks() {
        return this.tasks;
    }

    getTasksByProject(project) {
        return this.tasks.filter(entry => entry.project === project).map(entry => entry.task);
    }

    markComplete(task) {
        task.urgency = "completed";
    }
}

const taskManager = new TaskManager();


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

        taskBtnsDiv.appendChild(this.editTask());
        taskBtnsDiv.appendChild(this.completeTask());
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

    deleteTask(taskDom){
        const deleteTaskBtn = document.createElement('button');
        deleteTaskBtn.textContent = 'Delete';
        deleteTaskBtn.classList.add('deleteTaskBtn');
        deleteTaskBtn.addEventListener('click',()=>{
            taskDom.remove();
            taskManager.deleteTask(this.task, this.project);
        })
        return deleteTaskBtn;
    }

    completeTask(){    
        const completeTaskBtn = document.createElement('button');
        completeTaskBtn.textContent = "Mark as Complete";
        completeTaskBtn.classList.add('completeTaskBtn');
    
        completeTaskBtn.addEventListener('click', () => {
            if(this.task.urgency === "completed") return;
            this.task.urgency = "completed";
            const current = projectManager.getCurrentProject();
            renderProjectWithAddButton(current);
            
        });
    
        return completeTaskBtn;
    }

    editTask(){
        const editTaskBtn = document.createElement('button');
        editTaskBtn.textContent = "Edit";
        editTaskBtn.classList.add('editTaskBtn');
        editTaskBtn.addEventListener('click', () => {
            taskTitle.value = this.task.taskTitle;
            taskDueDate.value = this.task.dueDate;
            taskUrgency.value = this.task.urgency;
            taskDesc.value = this.task.taskDesc;
        
            taskDialog.showModal();
        
            // Temporarily override addTodo button behavior
            const saveHandler = (e) => {
                e.preventDefault();
        
                taskManager.editTask(this.task, {
                    taskTitle: taskTitle.value,
                    dueDate: taskDueDate.value,
                    taskDesc: taskDesc.value,
                    urgency: taskUrgency.value
                });
        
                const current = projectManager.getCurrentProject();
                taskDialog.close();
                clearTaskForm();
                taskManager.deleteTask(this.task, current);
                renderProjectWithAddButton(current);
                
                addTodo.removeEventListener('click', saveHandler);

            };
            addTodo.addEventListener('click', saveHandler);

        });
        
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
                break;
        }
    }
}


console.log(projectManager.getAllProjects())

function renderDisplay(tasks, container, project){
    tasks.forEach(task =>{
        if(task.urgency == "completed") return;
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

    sampleProject.tasks.forEach(task => {
        const taskContent = new TaskCard(task, sampleProject);
        const taskDom = taskContent.createTaskCard();
        if (task.urgency === 'completed') {
            sampleProject.completedTasksSection.appendChild(taskDom);
        } else {
            sampleProject.tasksSection.appendChild(taskDom);
        }
    
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
        taskManager.addTask(NewTask,current);
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

function saveToLocalStoratge(){
    const data = {
        projects: projectManager.getAllProjects().map(project =>({
            projectName: project.projectName,
            tasks: project.tasks.map(task => ({
                taskTitle: task.taskTitle,
                dueDate: task.dueDate,
                taskDesc: task.taskDesc,
                urgency: task.urgency, 
            }))
        }))
    }
}


