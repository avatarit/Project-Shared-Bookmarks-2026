# TESTING.md — Shared Bookmarks

This document explains how we tested each rubric requirement for the Shared Bookmarks project.

---

## 1) The website must contain a drop-down which lists five users

**How we tested:**
- Opened the website in the browser.
- Checked the user drop-down and confirmed it contains exactly 5 options: User 1, User 2, User 3, User 4, User 5.
- Also verified `getUserIds()` returns `["1","2","3","4","5"]` in `storage.js`.
- We wrote a unit test that checks:
   getUserIds().length === 5
   and ran it using npm test.
---

## 2) Selecting a user must display the list of bookmarks for the relevant user

**How we tested:**
- Selected User 1 and added a bookmark using the form.
- Switched to User 2 and confirmed User 1’s bookmark is NOT shown.
- Added a different bookmark for User 2.
- Switched back and forth between users and confirmed each user shows only their own bookmarks.

---
## 3) If there are no bookmarks for the selected user, a message is displayed to explain this

**How I tested:**
- Clicked the "Clear" button for a user (or used `clearData(userId)` during development).
- Selected that user from the drop-down and confirmed the “no bookmarks” message is visible.
- Added a new bookmark and confirmed the message disappears and the list appears.

---

## 4) The list of bookmarks must be shown in reverse chronological order

**How I tested:**
- Added two bookmarks for the same user with a small time gap (one after the other).
- Confirmed the most recently added bookmark appears at the top of the list.
- Verified the sorting logic in code uses timestamp comparison (newest first).

**Unit test:**
- Wrote a unit test for sorting logic in `script.test.js`.
- To make testing possible, I wrapped the DOM-related code in `script.js` inside an `if (typeof document !== "undefined")` block so that only the pure functions (such as sorting) are imported and tested in Node.
- Ran the tests using `npm test` and confirmed they passed.