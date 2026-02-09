// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData, clearData} from "./storage.js";

//-------------------------------------------------
const userSelect = document.getElementById("user-select");
let currentUserId = "";


// load users into dropdown
function loadUsers() {
  const users = getUserIds();
  

  //creating the dropdown options
  for (let i = 0; i < users.length; i++) {
    const option = document.createElement("option");
    option.value = users[i];
    option.textContent = "User " + users[i];
    userSelect.appendChild(option);
  }

  //for first window load = when no user is selected
  currentUserId = users[0]; 
  renderBookmarks(currentUserId);

}

window.onload = loadUsers;

 //to identify which user has been selected using (change) 
 userSelect.addEventListener("change", function(){
    currentUserId = userSelect.value; 
    renderBookmarks(currentUserId);
  });


// save the data 

// listen for form submit 

const myForm = document.getElementById("bookmark-form");
myForm.addEventListener("submit", (e)=>{
  e.preventDefault();

// making the bookmark  
// get the data from user entry and creating id ,
// timestamp and like for each one

let url = document.getElementById("url").value;
let title = document.getElementById("title").value;
let description = document.getElementById("description").value;
let createdAt = new Date().toISOString();
let likes = 0;
let bookmarkId = crypto.randomUUID();

 let bookmark = {
  bookmarkId: bookmarkId,
  url:url,
  title:title, 
  description:description,
  createdAt: createdAt,
  likes: likes,
}
//console.log(bookmark);

//testing function = working : )
//console.log("testing getData:..........");
//console.log(getData(currentUserId));

//saving this bookmark into bookmarks array then to local storage 

//check if bookmarks for this user is empty = null 
 if (getData(currentUserId) === null ){
  let bookmarks = [];
  bookmarks.push(bookmark);
  saveBookmark(bookmarks);
 }

 else {
  let currentBookmarks = getData(currentUserId);
  let bookmarks= [...currentBookmarks, bookmark];
  console.log("this is the combined bookmarks...");
  console.log(bookmarks);
  saveBookmark(bookmarks);
 }
 

}
);


function saveBookmark (data){
setData(currentUserId, data)
}


// display the bookmarks for selected user
//when a user is selected , render all bookmark that is entered by the uesr

//this should displayed when a user is selected 
function renderBookmarks (currentUserId){
  let bookmarks= getData(currentUserId);
  console.log(bookmarks);

}







//---------------------------------------------------------------//
//NEXT STEPS:
// validate the entered bookmark before saving them 
// for ex: look for any duplicates   

//

// render on screen using the renderBookmarks()
// then loop through the array and display the the bookmarks one by one 
//bookmarks should be newest to oldest 

//like button

//copy url button 

//clear data button 

//deploy web 

//lighthouse 

//test.js


