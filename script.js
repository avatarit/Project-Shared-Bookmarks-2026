// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds} from "./storage.js";

const userSelect = document.getElementById("user-select");

let currentUserId = "";


// load users into dropdown
function loadUsers() {
  const users = getUserIds();

  for (let i = 0; i < users.length; i++) {
    const option = document.createElement("option");
    option.value = users[i];
    option.textContent = "User " + users[i];
    userSelect.appendChild(option);
  }

  //currentUserId = users[0];
  //why are you storing the value of the first element here ? 
  //it should be the one that the user has selected 

  //to identify which user has been selected using (change)

  userSelect.addEventListener("change", function(){
    currentUserId = userSelect.value;
    //next stepps
    //the change trigger should disply the data related to this user only 
    //also should store the user number so can be used in saving the new entery data
    console.log(`current user id is: ${currentUserId}`);
    console.log(typeof(currentUserId));
    displayData(currentUserId);
  }

  );
  
  
  // userSelect.value = currentUserId;

 
 // showBookmarks(currentUserId);
}



window.onload = loadUsers;




// save the data 

// listen for form submit 
document.getElementById("bookmark-form").addEventListener("submit", (e)=>{
  e.preventDefault();
  
  
// get the data from user entry 
let url = document.getElementById("url").value;
let title = document.getElementById("title").value;
let description = document.getElementById("description").value;

//temp storage to make sure its working 
let bookmarks = [];
let bookmark = {
  url:url,
  title:title, 
  description:description,
}

console.log(bookmark);
bookmarks.push(bookmark);
saveBookmark(bookmarks);

});


function saveBookmark (data){
//the current code is only saving last entery , the rest is deleted 

  //temp 
  let userId = currentUserId;
  console.log("current user id is....");
  console.log(userId);
localStorage.setItem(`stored-data-user-${userId}`, JSON.stringify(data));
console.log("Hello world");

//we need to retrieve whatever is saved then add the new entery then save them again
}


// display the bookmarks for selected user
//when a user is selected , render all bookmark that is entered by the uesr

//export function getData(userId) {
 // return JSON.parse(localStorage.getItem(`stored-data-user-${userId}`));
//}

//this should displayed when a user is selected 
function displayData (userId){
  let bookmarks= [];
  console.log(JSON.parse(localStorage.getItem(`stored-data-user-${userId}`)));

  bookmarks.push(JSON.parse(localStorage.getItem(`stored-data-user-${userId}`)));
  console.log(bookmarks);

}









// validate the data 

// display the data 