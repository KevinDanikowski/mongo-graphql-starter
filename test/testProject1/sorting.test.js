import spinUp from "./spinUp";

let db, schema, queryAndMatchArray, runMutation;
beforeAll(async () => {
  ({ db, schema, queryAndMatchArray, runMutation } = await spinUp());

  await db.collection("books").insert({ title: "Book 4", pages: 200 });
  await db.collection("books").insert({ title: "Book 6", pages: 200 });
  await db.collection("books").insert({ title: "Book 5", pages: 200 });
  await db.collection("books").insert({ title: "Book 8", pages: 200 });
  await db.collection("books").insert({ title: "Book 1", pages: 100 });
  await db.collection("books").insert({ title: "Book 2", pages: 150 });
  await db.collection("books").insert({ title: "Book 7", pages: 210 });
  await db.collection("books").insert({ title: "Book 3", pages: 90 });
});

afterAll(async () => {
  await db.collection("books").remove({});
  db.close();
  db = null;
});

test("Sort test 1", async () => {
  await queryAndMatchArray({
    query: "{allBooks(SORT: {title: 1}){Books{title, pages}}}",
    coll: "allBooks",
    results: [
      { title: "Book 1", pages: 100 },
      { title: "Book 2", pages: 150 },
      { title: "Book 3", pages: 90 },
      { title: "Book 4", pages: 200 },
      { title: "Book 5", pages: 200 },
      { title: "Book 6", pages: 200 },
      { title: "Book 7", pages: 210 },
      { title: "Book 8", pages: 200 }
    ]
  });
});

test("Sort test 2", async () => {
  await queryAndMatchArray({
    query: "{allBooks(SORTS: [{pages: 1}, {title: 1}]){Books{title, pages}}}",
    coll: "allBooks",
    results: [
      { title: "Book 3", pages: 90 },
      { title: "Book 1", pages: 100 },
      { title: "Book 2", pages: 150 },
      { title: "Book 4", pages: 200 },
      { title: "Book 5", pages: 200 },
      { title: "Book 6", pages: 200 },
      { title: "Book 8", pages: 200 },
      { title: "Book 7", pages: 210 }
    ]
  });
});

test("Sort test 3", async () => {
  await queryAndMatchArray({
    query: "{allBooks(SORTS: [{pages: 1}, {title: -1}]){Books{title, pages}}}",
    coll: "allBooks",
    results: [
      { title: "Book 3", pages: 90 },
      { title: "Book 1", pages: 100 },
      { title: "Book 2", pages: 150 },
      { title: "Book 8", pages: 200 },
      { title: "Book 6", pages: 200 },
      { title: "Book 5", pages: 200 },
      { title: "Book 4", pages: 200 },
      { title: "Book 7", pages: 210 }
    ]
  });
});

test("Sort test 4", async () => {
  await queryAndMatchArray({
    query: "{allBooks(SORTS: [{pages: -1}, {title: 1}]){Books{title, pages}}}",
    coll: "allBooks",
    results: [
      { title: "Book 7", pages: 210 },
      { title: "Book 4", pages: 200 },
      { title: "Book 5", pages: 200 },
      { title: "Book 6", pages: 200 },
      { title: "Book 8", pages: 200 },
      { title: "Book 2", pages: 150 },
      { title: "Book 1", pages: 100 },
      { title: "Book 3", pages: 90 }
    ]
  });
});

test("Sort test 5", async () => {
  await queryAndMatchArray({
    query: "{allBooks(SORTS: [{pages: -1}, {title: -1}]){Books{title, pages}}}",
    coll: "allBooks",
    results: [
      { title: "Book 7", pages: 210 },
      { title: "Book 8", pages: 200 },
      { title: "Book 6", pages: 200 },
      { title: "Book 5", pages: 200 },
      { title: "Book 4", pages: 200 },
      { title: "Book 2", pages: 150 },
      { title: "Book 1", pages: 100 },
      { title: "Book 3", pages: 90 }
    ]
  });
});
