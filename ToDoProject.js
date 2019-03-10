let mylists = new List();

function List(){
    this.collection = [];
    this.add = function(laugh){
        this.collection.push(new List(laugh));
    };
}

let taskInput = document.getElementById("new-task"); 
let addButton = document.getElementsByTagName("button")[0]; 
let incompleteTasksHolder = document.getElementById("incomplete-tasks"); 
let completedTasksHolder= document.getElementById("completed-tasks"); 


function createNewTaskElement(taskString) {
  let listItem = document.createElement("li");

  let checkBox = document.createElement("input"); 
  let label = document.createElement("label");
  let editInput = document.createElement("input"); 
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

function addTask() {
  let listItem = createNewTaskElement(taskInput.value);
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

function editTask() {

  let listItem = this.parentNode;
  
  let editInput = listItem.querySelector("input[type=text");
  let label = listItem.querySelector("label");
  
  let containsClass = listItem.classList.contains("editMode");
  
  if(containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  
  listItem.classList.toggle("editMode");
  
}

function deleteTask() {
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  
  ul.removeChild(listItem);
}

function taskCompleted() {
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  let listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  let checkBox = taskListItem.querySelector("input[type=checkbox]");
  let editButton = taskListItem.querySelector("button.edit");
  let deleteButton = taskListItem.querySelector("button.delete");
  
  editButton.onclick = editTask;
  
  deleteButton.onclick = deleteTask;
  
  checkBox.onchange = checkBoxEventHandler;
}

function ajaxRequest() {
}

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

for(let i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for(let i = 0; i < completedTasksHolder.children.length; i++) {
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