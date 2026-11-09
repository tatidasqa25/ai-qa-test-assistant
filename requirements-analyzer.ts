type TestCase = {
  confidence: number;
  expectedRouting: string;
};

export function generateBoundaryTests(
  threshold: number,
  routingThreshold: number,
): TestCase[] {
  return [threshold - 1, threshold, threshold + 1].map((confidence) => ({
    confidence,
    expectedRouting:
      confidence < 0 || confidence > 100
        ? "400 Bad Request"
        : confidence < routingThreshold
          ? "Manual Review"
          : "Auto Approved",
  }));
}
