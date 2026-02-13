import { getUserIds, getData, setData, clearData} from "./storage.js";
import { sortBookmarks } from "./logic.js";


//----------------------  Users dropdown  ---------------------------

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

 
//----------------------  Form  --------------------------- 

const myForm = document.getElementById("bookmark-form");

// listen for form submit
myForm.addEventListener("submit", (e)=>{
  e.preventDefault();

// get the data from user entry and creating timestamp, like button and copy button for each one
const url = document.getElementById("url").value;
const title = document.getElementById("title").value;
const description = document.getElementById("description").value;
const createdAt = new Date().toISOString(); // this for the sort
const likes = 0;

 const bookmark = {
  url:url,
  title:title, 
  description:description,
  createdAt: createdAt,
  likes: likes,
}
  addBookmark(bookmark);
  myForm.reset();
  renderBookmarks(currentUserId);
}
);


//----------------------  Bookmarks  ---------------------------


// addBookmark() will add the new bookmark to the old ones then send them to saveBookmark()
function addBookmark (bookmark){
    const currentBookmarks= getData(currentUserId) || [];
    currentBookmarks.push(bookmark);
    saveBookmark(currentBookmarks);
 }

//save the bookmarks into local storage
function saveBookmark (data){
    setData(currentUserId, data);
  }

// render/display the bookmarks for selected user from the local storage
function renderBookmarks (currentUserId){

  const bookmarks= getData(currentUserId);
  const noBookmarkText = document.getElementById("no-bookmarks-message");
  const bookmarkList = document.getElementById("bookmark-list");
  bookmarkList.innerHTML= ""; // to clear the display when changing the users, so only displaying the selected user's bookmarks

  if (!bookmarks || bookmarks.length === 0) {
    noBookmarkText.hidden = false;
    return;
  }
 
    noBookmarkText.hidden = true;
    const sortedBookmarks = sortBookmarks(bookmarks);

    //loop through bookmarks to create the containers for the bookmarks on web
    //and create all bookmark details inside container

    for (const b of sortedBookmarks){
      const bookmarkcontainer = document.createElement("div");
      bookmarkList.appendChild(bookmarkcontainer);
      bookmarkcontainer.className="bookmark-background"; 

      const titleLink = document.createElement("a");
      titleLink.href= b.url;
      titleLink.textContent= b.title;
      titleLink.target= "_blank";
      bookmarkcontainer.appendChild(titleLink);

      const description = document.createElement("p");
      description.textContent= b.description;
      bookmarkcontainer.appendChild(description);

      const time = document.createElement("p");
      time.textContent= "Created at: "
      time.textContent += new Date(b.createdAt).toLocaleString();  
      bookmarkcontainer.appendChild(time);
      
      const copyButton = document.createElement("button");
      copyButton.type = "button";
      copyButton.textContent = "Copy to clipboard";
      copyButton.addEventListener("click", function () {
        navigator.clipboard.writeText(b.url).then(() => {
          copyButton.textContent = "Copied!";
          setTimeout(() => {
            copyButton.textContent = "Copy to clipboard";
          }, 1000);
        });
      });
      
      bookmarkcontainer.appendChild(copyButton);
      
      const likeButton = document.createElement("button");
      likeButton.type= "button";
      likeButton.textContent= "Like  " + (b.likes || 0); 
      bookmarkcontainer.appendChild(likeButton);
      likeButton.addEventListener("click", function () {
        const stored = getData(currentUserId) || [];
        for (let i = 0; i < stored.length; i++) {
          if (stored[i].createdAt === b.createdAt) {
            stored[i].likes = (stored[i].likes || 0) + 1;
            break;
          }
        }
        setData(currentUserId, stored);
        renderBookmarks(currentUserId);
      });
    }
  }


// ----------  Clear all the bookmarks for selected user  ------------------
const clearButton = document.getElementById("clear-data-btn");
clearButton.addEventListener("click", ()=> {
  clearData(currentUserId);
  renderBookmarks(currentUserId);
});
