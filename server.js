import "dotenv/config";
import express from "express";
import PiRPC from "./sdk/piRpc.js";
import AIOracle from "./oracle/aiOracle.js";
import { checkAccount } from "./blockchain/piInvoke.js";

const app = express();
const rpc = new PiRPC();

app.use(express.json());

// HEALTH
app.get("/health", async (req, res) => {
  try {
    const data = await rpc.getHealth();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LEDGER
app.get("/ledger", async (req, res) => {
  try {
    const data = await rpc.getLedger();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AI INSIGHT
app.get("/oracle/analysis", async (req, res) => {
  try {
    const data = await AIOracle.analyzeNetwork();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SIMULATE TX
app.post("/simulate", async (req, res) => {
  try {
    const { from, to, amount } = req.body;
    const result = await AIOracle.simulateTransaction({ from, to, amount });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PI ACCOUNT
app.get("/pi/account", async (req, res) => {
  try {
    const result = await checkAccount();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// START SERVER
app.listen(3000, () => {
  console.log("🔥 PiRC API running on http://localhost:3000");
});
