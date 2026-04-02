const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Backend aktif 🚀");
});

app.listen(PORT, () => {
  console.log("Server jalan di port " + PORT);
});
app.get("/pi/account", async (req, res) => {
  try {
    const result = await rpc.getAccount?.() || {
      status: "not_implemented",
      message: "rpc.getAccount belum tersedia"
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
