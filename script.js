// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData} from "./storage.js";

//-------------------------------------------------
const userSelect = document.getElementById("user-select");
let currentUserId = "";

// load users into dropdown
function loadUsers() {
  const users = getUserIds();
  

  //creating the dropdown 
  for (let i = 0; i < users.length; i++) {
    const option = document.createElement("option");
    option.value = users[i];
    option.textContent = "User " + users[i];
    userSelect.appendChild(option);
  }

  //for first load = when no user is selected
  currentUserId = users[0]; 
  


  //to identify which user has been selected using (change)
    userSelect.addEventListener("change", function(){
    currentUserId = userSelect.value;
  
   
  });
  
  // displayData(currentUserId); will change name of function 
 // showBookmarks(currentUserId);
}

window.onload = loadUsers;




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
console.log(bookmark);

//testing function = working : )
console.log("testing getData:..........");
console.log(getData(currentUserId));

//saving this bookmark into bookmarks array then to local storage 
//check if bookmarks for this user is null 
 if (getData(currentUserId) === null ){
  let bookmarks = [];
  bookmarks.push(bookmark);
 }
 else {
  let currentBookmarks = getData(currentUserId);
  let bookmarks= [...currentBookmarks, bookmark];

 }
 
// bookmarks.push(bookmark);
// saveBookmark(bookmarks);



// else {
//   let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
//   bookmarks.push(bookmark);
//   saveBookmark(bookmarks);
//   localStorage.setItem("bookmarks", JSON.stringify(bookmarks));


// }

//temp storage to make sure its working 


}
);


function saveBookmark (data){
//the current code is only saving last entery , the rest is deleted 

  //temp 
  let userId = currentUserId;
  // console.log("current user id is....");
  // console.log(userId);
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