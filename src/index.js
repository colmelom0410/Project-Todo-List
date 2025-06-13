import "./style.css";


const mainContent = document.querySelector('#mainContent');
const projects = document.createElement('div');
projects.classList.add("projects");
const projectTitle = document.createElement('div');
projectTitle.textContent = "Title";
const projectContent = document.createElement('div');
projectTitle.classList.add("projectTitle");
projectContent.classList.add("projectContents");

projects.appendChild(projectTitle);
projects.appendChild(projectContent);
mainContent.appendChild(projects);

const task = document.createElement('div');
task.classList.add('tasks');
const taskTitle = document.createElement('div');
taskTitle.textContent = 'title';
taskTitle.classList.add('taskTitle');
const taskContent = document.createElement('div');
taskContent.classList.add('taskContent');
const dueDate = document.createElement('h5');
dueDate.textContent = "Due Date:";
const sampleDiv = document.createElement('div');
sampleDiv.classList.add('sample');
taskContent.appendChild(dueDate);
taskContent.appendChild(sampleDiv);
const taskFooter = document.createElement('div');
taskFooter.classList.add('taskFooter');
const taskFooterBtn = document.createElement('button');
taskFooterBtn.textContent = "+";
taskFooter.appendChild(taskFooterBtn);

projectContent.appendChild(task);
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