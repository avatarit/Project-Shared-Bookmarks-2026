// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData, clearData} from "./storage.js";

export function sortBookmarks(bookmarks) {
  return bookmarks.slice().sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}
if (typeof document !== "undefined") {

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
//let createdAt = new Date().toISOString(); // this for the sort
// let createdAt = new Date().toLocaleString(); //this for better display on web
let createdAt = new Date();

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
  renderBookmarks(currentUserId);
}
 
);

//save the bookmarks in the local storage
function saveBookmark (data){
setData(currentUserId, data)
}


// render/display the bookmarks for selected user
// when a user is selected , render all bookmark that is entered by the uesr

//this should displayed when a user is selected 
function renderBookmarks (currentUserId){


  let bookmarks= getData(currentUserId);
  //need sortBookmark(bookmarks) to display newest to oldest
  console.log(bookmarks);
  let noBookmarkText = document.getElementById("no-bookmarks-message");
  let bookmarkSection = document.getElementById("bookmark-section");
  let bookmarkList = document.getElementById("bookmark-list");
  bookmarkList.innerHTML= ""; // to clear the display for new user selected bookmarks

  if(bookmarks === null){
    noBookmarkText.hidden = false;
    //need to fixt the type error in console (it apprears when selecting a user with empty bookmarks)
  }
  else {
    // bookmarkSection.textContent= ""; // this is overridden everything i wrote down 
    bookmarks = sortBookmarks(bookmarks);

    for (const b of bookmarks){
      let bookmarkcontainer = document.createElement("div");
      let li = document.createElement("li");
      
      bookmarkList.appendChild(li);
      li.className="bookmark-background";

      let titleLink = document.createElement("a");
      titleLink.href= b.url;
      titleLink.textContent= b.title;
      titleLink.target= "_blank";
      li.appendChild(titleLink);

      let desc = document.createElement("p");
      desc.textContent= b.description;
      li.appendChild(desc);

      let time = document.createElement("p");
      time.textContent= "Created at: "
      time.textContent += new Date(b.createdAt).toLocaleString();
      li.appendChild(time);
      //still need to check what best data type for time to use it in sorting 
      
      let copyButton = document.createElement("button");
      copyButton.type = "button";
      copyButton.textContent = "Click to copy URL";
      
      copyButton.addEventListener("click", function () {
        navigator.clipboard.writeText(b.url).then(() => {
          copyButton.textContent = "Copied!";
        });
      });
      
      li.appendChild(copyButton);
      


      let likeButton = document.createElement("button");
      likeButton.type= "button";
      likeButton.textContent= "Like  " + (b.likes || 0);
      likeButton.addEventListener("click", handleLikeButton );
      li.appendChild(likeButton);

      function handleLikeButton() {

        let stored = getData(currentUserId) || [];
      
        for (let i = 0; i < stored.length; i++) {
          if (stored[i].bookmarkId === b.bookmarkId) {
            stored[i].likes = (stored[i].likes || 0) + 1;
            break;
          }
        }
      
        setData(currentUserId, stored);
      
        renderBookmarks(currentUserId);
      }

      //I need to clear everything before i render for new user


      


      
    }

  }

}

// clear the bookmarks 
const clearButton = document.getElementById("clear-data-btn");
clearButton.addEventListener("click", ()=> {
  clearData(currentUserId);
  console.log(currentUserId, "Deleeeeeeeeted");
  renderBookmarks(currentUserId);
});







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

}