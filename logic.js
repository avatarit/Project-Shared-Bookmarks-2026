export function sortBookmarks(bookmarks) {
    return bookmarks.slice().sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }