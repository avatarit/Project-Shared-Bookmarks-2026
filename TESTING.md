# TESTING.md — Shared Bookmarks

This document explains how we tested each rubric requirement for the Shared Bookmarks project.

---

## 1) The website must contain a drop-down which lists five users

**How we tested:**

- We opened the website in the browser.
- We checked the user drop-down and confirmed it contains exactly 5 options: User 1, User 2, User 3, User 4, User 5.
- We also verified getUserIds() returns ["1","2","3","4","5"] in storage.js.
- We applied the unit test that checks:
  getUserIds().length === 5
  and ran it using npm test.

---

## 2) Selecting a user must display the list of bookmarks for the relevant user

**How we tested:**

- We selected User 1 and added a bookmark using the form.
- We switched to User 2 and confirmed User 1’s bookmark is NOT shown.
- We added a different bookmark for User 2.
- We switched back and forth between users and confirmed each user shows only their own bookmarks.

---

## 3) If there are no bookmarks for the selected user, a message is displayed to explain this

**How we tested:**

- We clicked the "Clear" button for a user (or used clearData(userId) during development).
- We selected that user from the drop-down and confirmed the “no bookmarks” message is visible.
- We added a new bookmark and confirmed the message disappears and the list appears.

---

## 4) The list of bookmarks must be shown in reverse chronological order

**How we tested:**

- We added two bookmarks for the same user with a small time gap (one after the other).
- We confirmed the most recently added bookmark appears at the top of the list.
- We verified the sorting logic in code uses timestamp comparison (newest first).
- Sorting was also verified using automated unit tests for sortBookmarks() (see section 13).

---

## 5) Each bookmark has a title, description and created at timestamp displayed

**How we tested:**

- We added a new bookmark using the inputs for title, URL and description.
- After submitting the form, the title, description and the created at timestamp were displayed correctly for the new bookmark and existing bookmarks.
- As another case, we selected another user to view their bookmarks and confirmed that each bookmark has a title, description and created at timestamp displayed.

---

## 6) Each bookmark’s title is a link to the bookmark’s URL

**How we tested:**

- We added a new bookmark using the form.
- After submitting the form, the title appeared as a clickable link.
- We clicked on the title and confirmed it opened the matching URL that was entered.

---

## 7) Each bookmark's "Copy to clipboard" button must copy the URL of the bookmark

**How we tested:**

- Each displayed bookmark has a "Copy to clipboard" button.
- After clicking the button, it successfully copied the URL.
- We pasted the copied URL into the browser and confirmed it opened the matching URL for the bookmark we initially copied.

---

## 8) Each bookmark's like counter works independently, and persists data across sessions

**How we tested:**

- We selected different users and clicked the like button on multiple bookmarks.
- We confirmed that each bookmark’s like counter increased independently and did not affect other bookmarks.
- We refreshed the page and reopened the website to verify that the like counts were still saved for each user and bookmark.

---

## 9) The website must contain a form with inputs for a URL, a title, and a description. The form should have a submit button.

**How we tested:**

- We opened the website and checked that the form is visible.
- We confirmed that it contains three input fields (URL, title, and description) and a submit button.
- We entered sample data in all fields and clicked the submit button to make sure the form works correctly.

---

## 10) Submitting the form adds a new bookmark for the relevant user only

**How we tested:**

- We selected user number 3.
- We added a new bookmark for this user. The title was TikTok with its URL and description. This bookmark was unique and was not added before.
- After submitting the form, the bookmark was added only to user 3.
- This was verified by navigating through all other users to ensure the new bookmark was not added there, and also by checking Local Storage in DevTools > Application, where only user number 3 had the TikTok bookmark saved.

---

## 11) After creating a new bookmark, the list of bookmarks for the current user is shown, including the new bookmark

**How we tested:**

- We selected a user with previously saved 5 bookmarks.
- We added a new bookmark named Yahoo with its URL and description.
- All 6 bookmarks were displayed including the new one.

---

## 12) The website must score 100 for accessibility in Lighthouse

**How we tested:**

- We ran Lighthouse in Chrome DevTools under different scenarios:
  Case 1: We selected a user with 3 bookmarks and confirmed the accessibility score was 100%.
  Case 2: We selected a user with 0 bookmarks and confirmed the accessibility score was 100%.

---

## 13) Unit tests must be written for at least one non-trivial function

**How we tested:**

- We tested the sortBookmarks() function by writing automated unit tests to verify reverse chronological sorting.
- We created a test using sample bookmark data with different dates and confirmed that the most recent bookmark appears at the beginning of the array.
- We ran the tests using:

npm install  
npm test
