import express from "express";

const app = express();
app.use(express.json());

app.post("/api/documents", (req, res) => {
  const { documentType, confidence } = req.body ?? {};

  if (
    typeof confidence !== "number" ||
    !Number.isFinite(confidence) ||
    confidence < 0 ||
    confidence > 100
  ) {
    return res.status(400).json({
      error: "Invalid confidence",
    });
  }

  if (typeof documentType !== "string" || documentType.trim() === "") {
    return res.status(400).json({
      error: "Invalid document type",
    });
  }

  const routing = confidence < 80 ? "Manual Review" : "Auto Approved";

  return res.status(201).json({
    documentType,
    confidence,
    routing,
  });
});

app.listen(3000, () => {
  console.log("Document API running on port 3000");
});
