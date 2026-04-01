const express = require("express");
const { getHealth, getLatestLedger } = require("./piClient");

const app = express();
const PORT = 3000;

// root test
app.get("/", (req, res) => {
  res.send("Pi Backend API Running 🚀");
});

// health endpoint
app.get("/health", async (req, res) => {
  try {
    const data = await getHealth();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// latest ledger
app.get("/ledger/latest", async (req, res) => {
  try {
    const ledger = await getLatestLedger();
    res.json({ latestLedger: ledger });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
