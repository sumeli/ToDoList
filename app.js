// Select the Elements
const clear =  document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST, id;

//get items from the local storage
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data){
   LIST = JSON.parse(data);
   id = LIST.length; //set the id to the last one in the list
   loadList(LIST); // to load the list to the user's interface
}

else{
   //if the data is empty, this means that the user is using it for the first time
   LIST = [];
   id = 0;
}

//load the items to the user's interface
function loadList(array){
   array.forEach(function(item){
      addToDo(item.name, item.id, item.done, item.trash);
   });
}

//clear local storage using that reload sign
clear.addEventListener("click", function(){
   localStorage.clear();
   location.reload();
});

// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML =  today.toLocaleDateString("en-US", options);

//add a To-do fucntion
function addToDo(toDo, id, done, trash){

if(trash){ return; } //this will prevent the code below to run

const DONE = done ? CHECK : UNCHECK;
const LINE = done ? LINE_THROUGH : "";

const item = ` <li class="item">
<i class="fa ${DONE} co" job="complete" id="${id}"></i>
<p class="text ${LINE}">${toDo}</p>
<i class="fa fa-trash-o de" job="delete" id="${id}"></i>
</li>`;
    

const position = "beforeend";

list.insertAdjacentHTML(position, item);
}

//adding an item to the list using enter key 
document.addEventListener("keyup", function(even){

   if(event.keyCode == 13){
      const toDo = input.value;

      //if the input is not empty
      if(toDo){
         addToDo(toDo, id, false, false);

         LIST.push({  //this is an array actually 
            name : toDo,
            id : id,
            done : false,
            trash : false
         });

         //add item to local storage so even after refreshing the to-do list remains
         localStorage.setItem("TODO", JSON.stringify(LIST));

         id++;
      }
      input.value= "";
   }

});

//complete to-do for when the user clicks complete button
function completeToDo(element){
   element.classList.toggle(CHECK);
   element.classList.toggle(UNCHECK);
   element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

   LIST[element.id].done = LIST[element.id].done ? false : true;
} 

//remove a to-do
function removeToDo(element){
   element.parentNode.parentNode.removeChild(element.parentNode);
   LIST[element.id].trash = true;
}

//target the items created dynamically
list.addEventListener("click", function(event){
   const element = event.target; // will return the clicked element that is inside the list
   const elementJob = element.attributes.job.value; //return complete or delete

   if(elementJob == "complete"){
      completeToDo(element);
   }
   else if(elementJob == "delete"){
      removeToDo(element);
   }

   //add item to local storage so even after refreshing the to-do list remains
   localStorage.setItem("TODO", JSON.stringify(LIST));

});