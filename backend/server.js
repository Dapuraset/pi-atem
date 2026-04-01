import express from "express";
import PiRPC from "../sdk/piRpc.js";
import AIOracle from "../oracle/aiOracle.js";

const app = express();
const rpc = new PiRPC();

app.use(express.json());

// HEALTH
app.get("/health", async (req, res) => {
  const data = await rpc.getHealth();
  res.json(data);
});

// LEDGER
app.get("/ledger", async (req, res) => {
  const data = await rpc.getLedger();
  res.json(data);
});

// AI INSIGHT
app.get("/oracle/analysis", async (req, res) => {
  const data = await AIOracle.analyzeNetwork();
  res.json(data);
});

// SIMULASI TX
app.post("/simulate", async (req, res) => {
  const { from, to, amount } = req.body;
  const result = await AIOracle.simulateTransaction(from, to, amount);
  res.json(result);
});

app.listen(3000, () => {
  console.log("🔥 PiRC API running on http://localhost:3000");
});
app.get("/rpc/health", async (req, res) => {
  try {
    const data = await rpc.getHealth();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/rpc/network", async (req, res) => {
  try {
    const data = await rpc.getNetwork();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/rpc/version", async (req, res) => {
  try {
    const data = await rpc.getVersionInfo();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
