let mylists = new List();

function List(){
    this.collection = [];
    this.add = function(laugh){
        this.collection.push(new List(laugh));
    };
}

let taskInput = document.getElementById("new-task"); //new-task
let addButton = document.getElementsByTagName("button")[0]; //first button
let incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
let completedTasksHolder= document.getElementById("completed-tasks"); //completed-tasks


//New Task List Item
function createNewTaskElement(taskString) {
  //Create List Item
  let listItem = document.createElement("li");

  //input (checkbox)
  let checkBox = document.createElement("input"); // checkbox
  //label
  let label = document.createElement("label");
  //input (text)
  let editInput = document.createElement("input"); // text
  //button.edit
  let editButton = document.createElement("button");
  //button.delete
  let deleteButton = document.createElement("button");
  
  //Each element needs modifying
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  
  //Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

//Add a new task
function addTask() {
  //Create a new list item with the text from #new-task:
  let listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
  taskInput.value = "";
}


(function(){
    if(localStorage.alldata){
        let mydata = JSON.parse(localStorage.alldata);

        for(let l = 0; l < mydata.length; l++){

            mylists.add(mydata[l].name);

            for(let i = 0; i < mydata[l].collection.length; i++){
                mylists.collection[l].add(mydata[l].collection[i].name, mydata[l].collection[i].damage);
            }
        }
        pagePrint(mylists.collection);
    }
})();

//Edit an existing task
function editTask() {

  let listItem = this.parentNode;
  
  let editInput = listItem.querySelector("input[type=text");
  let label = listItem.querySelector("label");
  
  let containsClass = listItem.classList.contains("editMode");
  
  //if the class of the parent is .editMode
  if(containsClass) {
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
  }
  
  //Toggle .editMode on the list item
  listItem.classList.toggle("editMode");
  
}

//Delete an existing task
function deleteTask() {
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
}

//Mark a task as complete
function taskCompleted() {
  //Append the task list item to the #completed-tasks
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
function taskIncomplete() {
  //Append the task list item to the #incomplete-tasks
  let listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  //select taskListItem's children
  let checkBox = taskListItem.querySelector("input[type=checkbox]");
  let editButton = taskListItem.querySelector("button.edit");
  let deleteButton = taskListItem.querySelector("button.delete");
  
  //bind editTask to edit button
  editButton.onclick = editTask;
  
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}

function ajaxRequest() {
}

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTasksHolder ul list items
for(let i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for(let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

function getMyData(){
    $('.list').html('');
    let objectdata = JSON.parse(localStorage.alldata);
    console.log(objectdata);
    pagePrint(objectdata);
}
function pagePrint(listItem){
    for(let l = 0; l < listItem.length; l++){

        let listitems = "";

        for(let i = 0; i < listItem[l].collection.length; i++){
            listitems += '<div>'+ listItem[l].collection[i].name +'</div>';
        }

        $('.list').append("<div><span>"+ listItem[l].name + "</span>" +
            "<input onkeyup='addItem(this, this.value, event, "+ l +")' type='text' placeholder='Add Item...' class='iteminput'>"+
            "<div class='itemsbox'>"+ listitems + "</div>" +
            "</div>");
    }
}

// Nested Lists
// LocalStorage
// (optional) OnKeyUp
// (optional) not create blank lists
// **something from bootstrap
// **animate the delete function
