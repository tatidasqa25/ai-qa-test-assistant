import { test, expect } from "@playwright/test";

test("GET API returns successful response", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/users/1",
  );

  expect(response.status()).toBe(200);

  const user = await response.json();

  expect(user.id).toBe(1);
  expect(user.email).toBeTruthy();
});

test("GET nonexistent user returns 404", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/users/999999",
  );

  expect(response.status()).toBe(404);
});

test("POST creates a new post", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      data: {
        title: "QA Automation",
        body: "Learning API testing with Playwright",
        userId: 1,
      },
    },
  );

  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  expect(responseBody.title).toBe("QA Automation");
  expect(responseBody.userId).toBe(1);
  expect(responseBody.id).toBeDefined();
});
