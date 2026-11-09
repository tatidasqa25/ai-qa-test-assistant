import { test, expect } from "@playwright/test";

function routeDocument(confidence: number): string {
  if (confidence < 80) {
    return "Manual Review";
  }

  return "Auto Approved";
}

test("79% goes to Manual Review", () => {
  const result = routeDocument(79);
  expect(result).toBe("Manual Review");
});

test("80% goes to Auto Approved", () => {
  const result = routeDocument(80);
  expect(result).toBe("Auto Approved");
});

test("81% goes to Auto Approved", () => {
  const result = routeDocument(81);
  expect(result).toBe("Auto Approved");
});

test("0% goes to Manual Review", () => {
  const result = routeDocument(0);
  expect(result).toBe("Manual Review");
});

test("100% goes to Auto Approved", () => {
  const result = routeDocument(100);
  expect(result).toBe("Auto Approved");
});
