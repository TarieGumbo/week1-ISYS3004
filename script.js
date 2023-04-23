// Empty script file to start with
// After the user has enetred a list descirption,the user will click on the add Task button that the list descrition shoud be added to the list and should be preceed by a checkbox
// 1- Grab an item from the DOM & assign it to a variable
// 2. Write a function to handle the event 
    // create the li element
    // let li = document.createElement('li');

    // set the text content of the li to the task name 
    // li.textContent = taskName;

    // create a new checkbox element 
    // let checkbox = document.createElement('input');
    // checkbox.type = "checkbox";
    // checkbox.id = "checkbox";

    // create a new label element 
    // let label = document.createElement('label');
    // label.setAttribute('for', 'checkbox');
    // label.textContent = taskName;

    // append the checkbox and label to the li element
    // li.appendChild(checkbox);
    // li.appendChild(label);
    
    // append the list to the todoList Container 
    // todoListContainer.appendChild(li);
// 3-Connect the variable and the function via the event listenr so that an evet trigges the uodate of the DOM


// step 1 
let addButton = document.getElementById('add-task')
let newTaskInput = document.getElementById('task-input')
let todoListContainer = document.getElementById('todolist')

let templateElement = document.getElementById('list-item-template');
let template = templateElement.innerHTML;
let showActiveButton = document.getElementById("show-active")
let showAllButton = document.getElementById("show-all")
let showCompletedButton = document.getElementById("show-completed")

// save to local storage 
function saveTask(name, isCompleted){
    localStorage.setItem(name,isCompleted)
}

// function to read from local storage and read it 
function renderTasks(){
    for(let i=0; i<localStorage.length; i++){
        let taskName = localStorage.key(i)
        let isCompleted= localStorage.getItem(taskName) == "true";
        
        let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);

        if(!isCompleted){
            todoListContainer.insertAdjacentHTML('afterbegin', taskHTML);
        }
    }

}
// step 2 
function onAddTaskClicked(e){
    // retreive the value of the task input and assign to a variable
    let taskName = newTaskInput.value;
    newTaskInput.value= "";

//   update taskname in the template for the li text/placeholder
    if(taskName!=""){

    let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
    // append the taskHTML to my ul 
    todoListContainer.insertAdjacentHTML('afterbegin', taskHTML);
    saveTask(taskName, false);
    }
    
}

// create the active task Button
function onTodoListClicked(e){
     let targetElement = e.target;
    while (!targetElement.classList.contains("task")){
        targetElement = targetElement.parentElement;
    }
    let checkbox = targetElement.querySelector(".checkbox");

    if(checkbox.checked){
        // task shoudl be striked through
        targetElement.classList.add("completed");
    }
    else{
        // checkbox should be normal
        targetElement.classList.remove("completed");
    }
    let TaskNameElement = targetElement.querySelector(".task-name");
    let taskName = TaskNameElement.innerText;
    
    saveTask(taskName,checkbox.checked);
}

function showActiveTasks(e){
    let tasks = document.getElementsByClassName("task");
    for(let i=0; i<tasks.length; i++){
        if (tasks[i].classList.contains("completed")){
            tasks[i].style.display = "none";
        }
        else{
            tasks[i].style.display= "block";
        }
    }

}    
// create the show all Task Button
    function onTodoListClicked(e){
        let targetElement = e.target;
       while (!targetElement.classList.contains("task")){
           targetElement = targetElement.parentElement;
       }
       let checkbox = targetElement.querySelector(".checkbox");
   
       if(checkbox.checked){
           // task shoudl be striked through
           targetElement.classList.add("completed");
       }
       else{
           // checkbox should be normal
           targetElement.classList.remove("completed");
       }
       let TaskNameElement = targetElement.querySelector(".task-name");
       let taskName = TaskNameElement.innerText;
       
       saveTask(taskName,checkbox.checked);
   }
   
   function showAllTasks(e){
       let tasks = document.getElementsByClassName("task");
       for(let i=0; i<tasks.length; i++){
           tasks[i].style.display= "block";
           }
       }   

// create the completed button 
function onTodoListClicked(e){
    let targetElement = e.target;
   while (!targetElement.classList.contains("task")){
       targetElement = targetElement.parentElement;
   }
   let checkbox = targetElement.querySelector(".checkbox");

   if(checkbox.checked){
       // task should be striked through
       targetElement.classList.add("completed");
   }
   else{
       // checkbox should be normal
       targetElement.classList.remove("active");
   }
   let TaskNameElement = targetElement.querySelector(".task-name");
   let taskName = TaskNameElement.innerText;
   
   saveTask(taskName,checkbox.checked);
}

function showCompletedTasks(e){
   let tasks = document.getElementsByClassName("task");
   for(let i=0; i<tasks.length; i++){
       if (tasks[i].classList.contains("completed")){
           tasks[i].style.display = "block";
       }
       else{
           tasks[i].style.display= "none";
       }
   }
}
// step 3
addButton.addEventListener('click', onAddTaskClicked)
todoListContainer.addEventListener('click', onTodoListClicked);
showActiveButton.addEventListener('click', showActiveTasks)
showCompletedButton.addEventListener('click',showCompletedTasks)
showAllButton.addEventListener('click',showAllTasks)
renderTasks();


// what is camelcase format 