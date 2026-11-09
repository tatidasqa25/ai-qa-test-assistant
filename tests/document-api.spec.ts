import { test, expect } from "@playwright/test";

test("Valid document returns 201", async ({ request }) => {
  const response = await request.post("http://localhost:3000/api/documents", {
    data: {
      documentType: "Invoice",
      confidence: 79,
    },
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.routing).toBe("Manual Review");
});

test("Invalid confidence returns 400", async ({ request }) => {
  const response = await request.post("http://localhost:3000/api/documents", {
    data: {
      documentType: "Invoice",
      confidence: -5,
    },
  });

  expect(response.status()).toBe(400);
});

for (const [confidence, expectedRouting] of [
  [79, "Manual Review"],
  [80, "Auto Approved"],
  [81, "Auto Approved"],
] as const) {
  test(`Confidence ${confidence} routes correctly`, async ({ request }) => {
    const response = await request.post("http://localhost:3000/api/documents", {
      data: {
        documentType: "Invoice",
        confidence,
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.routing).toBe(expectedRouting);
  });
}

for (const confidence of [-1, 101, null, "abc"]) {
  test(`Reject invalid confidence: ${confidence}`, async ({ request }) => {
    const response = await request.post("http://localhost:3000/api/documents", {
      data: {
        documentType: "Invoice",
        confidence,
      },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBe("Invalid confidence");
  });
}
