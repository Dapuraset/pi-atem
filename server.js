import "dotenv/config";
import express from "express";
import PiRPC from "./sdk/piRpc.js";
import AIOracle from "./oracle/aiOracle.js";
import { checkAccount } from "./blockchain/piInvoke.js";

const app = express();
const rpc = new PiRPC();

app.use(express.json());

app.get("/health", async (req, res) => {
  const data = await rpc.getHealth();
  res.json(data);
});

app.get("/ledger", async (req, res) => {
  const data = await rpc.getLedger();
  res.json(data);
});

app.get("/oracle/analysis", async (req, res) => {
  const data = await AIOracle.analyzeNetwork();
  res.json(data);
});

app.post("/simulate", async (req, res) => {
  const { from, to, amount } = req.body;
  const result = await AIOracle.simulateTransaction({ from, to, amount });
  res.json(result);
});

app.get("/pi/account", async (req, res) => {
  const result = await checkAccount();
  res.json(result);
});

app.listen(3000, () => {
  console.log("🔥 PiRC API running on http://localhost:3000");
});
