import { test, expect } from "@playwright/test";
import { generateBoundaryTests } from "../requirements-analyzer";

const testCases = [
  ...generateBoundaryTests(80, 80),
  ...generateBoundaryTests(100, 80),
];

for (const testCase of testCases) {
  test(`Generated test: confidence ${testCase.confidence}`, async ({
    request,
  }) => {
    const response = await request.post("http://localhost:3000/api/documents", {
      data: {
        documentType: "Invoice",
        confidence: testCase.confidence,
      },
    });

    const expectedStatus =
      testCase.expectedRouting === "400 Bad Request" ? 400 : 201;

    expect(response.status()).toBe(expectedStatus);

    if (expectedStatus === 201) {
      const body = await response.json();
      expect(body.routing).toBe(testCase.expectedRouting);
    }
  });
}
