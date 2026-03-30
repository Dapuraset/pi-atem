import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        attention: Math.random() * 10,
        quality: Math.random(),
        verification: Math.random(),
      };

      newData.reward =
        newData.attention *
        newData.quality *
        newData.verification;

      setData((prev) => [...prev.slice(-20), newData]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>PiRC-AI Dashboard</h1>

      {data.map((d, i) => (
        <div key={i}>
          Reward: {d.reward.toFixed(2)}
        </div>
      ))}
    </div>
  );
}

export default App;
