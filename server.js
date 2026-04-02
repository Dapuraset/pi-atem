const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// HOME
app.get("/", (req, res) => {
  res.send("Backend aktif");
});

// PI ACCOUNT
app.get("/pi/account", async (req, res) => {
  try {
    const result = {
      status: "not implemented",
      message: "rpc.getAccount belum tersedia"
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});
