import assert from "node:assert";
import test from "node:test";
import { getUserIds } from "./storage.js";
import { sortBookmarks } from "./script.js";


test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("bookmarks are sorted newest first", () => {
  const data = [
    { createdAt: "2023-01-01T10:00:00Z" },
    { createdAt: "2024-01-01T10:00:00Z" }
  ];

  const result = sortBookmarks(data);

  assert.equal(result[0].createdAt, "2024-01-01T10:00:00Z");
});