import { getUserIds, getData, setData, clearData } from "./storage.js";

const userSelect = document.getElementById("user-select");
const bookmarkList = document.getElementById("bookmark-list");
const noBookmarksMessage = document.getElementById("no-bookmarks-message");
const form = document.getElementById("bookmark-form");
const clearBtn = document.getElementById("clear-data-btn");

let currentUserId = null;


// load users into dropdown
function loadUsers() {
  const users = getUserIds();

  for (let i = 0; i < users.length; i++) {
    const option = document.createElement("option");
    option.value = users[i];
    option.textContent = "User " + users[i];
    userSelect.appendChild(option);
  }

  currentUserId = users[0];
  userSelect.value = currentUserId;

  showBookmarks(currentUserId);
}



// show bookmarks
function showBookmarks(userId) {
  let bookmarks = getData(userId) || [];

  // sort newest first
  bookmarks.sort(function (a, b) {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  bookmarkList.innerHTML = "";

  if (bookmarks.length === 0) {
    noBookmarksMessage.hidden = false;
    return;
  }

  noBookmarksMessage.hidden = true;

  for (let i = 0; i < bookmarks.length; i++) {
    const bookmark = bookmarks[i];

    const div = document.createElement("div");

    // create title link
    const link = document.createElement("a");
    link.href = bookmark.url;
    link.target = "_blank";
    link.textContent = bookmark.title;

    // description
    const desc = document.createElement("p");
    desc.textContent = bookmark.description;

    // timestamp
    const time = document.createElement("small");
    time.textContent = new Date(bookmark.timestamp).toLocaleString();

    // copy button
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy URL";
    copyBtn.type = "button";

    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(bookmark.url);
      copyBtn.textContent = "Copied";
    });

    // like button
    if (bookmark.likes === undefined) {
      bookmark.likes = 0;
    }

    const likeBtn = document.createElement("button");
    likeBtn.textContent = "Like (" + bookmark.likes + ")";
    likeBtn.type = "button";

    likeBtn.addEventListener("click", function () {
      bookmark.likes++;

      // update stored bookmarks
      let stored = getData(currentUserId) || [];
      for (let j = 0; j < stored.length; j++) {
        if (stored[j].timestamp === bookmark.timestamp) {
          stored[j].likes = bookmark.likes;
          break;
        }
      }

      setData(currentUserId, stored);

      showBookmarks(currentUserId);
    });

    // build element
    div.appendChild(link);
    div.appendChild(desc);
    div.appendChild(time);
    div.appendChild(document.createElement("br"));
    div.appendChild(copyBtn);
    div.appendChild(likeBtn);

    bookmarkList.appendChild(div);
  }
}


// change user
userSelect.addEventListener("change", function () {
  currentUserId = userSelect.value;
  showBookmarks(currentUserId);
});


// add bookmark
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newBookmark = {
    url: form.url.value,
    title: form.title.value,
    description: form.description.value,
    timestamp: new Date().toISOString(),
    likes: 0
  };

  let bookmarks = getData(currentUserId);
  if (!bookmarks) {
    bookmarks = [];
  }

  bookmarks.push(newBookmark);
  setData(currentUserId, bookmarks);

  form.reset();
  showBookmarks(currentUserId);
});


// clear bookmarks
clearBtn.addEventListener("click", function () {
  if (!currentUserId) return;
  clearData(currentUserId);
  showBookmarks(currentUserId);
  
});

window.onload = loadUsers;
