import fetch from "node-fetch";

class PiRPC {
  constructor(url = "https://rpc.testnet.minepi.com") {
    this.url = url;
  }

  async call(method, params = []) {
    try {
      const res = await fetch(this.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: Date.now(),
          method,
          params,
        }),
      });

      const data = await res.json();
      return data.result;
    } catch (err) {
      console.error("RPC ERROR:", err.message);
      return null;
    }
  }

  // helper level dewa
  getHealth() {
    return this.call("getHealth");
  }

  getLedger() {
    return this.call("getLatestLedger");
  }

  getAccount(address) {
    return this.call("getAccount", [address]);
  }
}

export default PiRPC;
