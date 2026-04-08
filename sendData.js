const axios = require("axios"); 
const writeKey = "MNPDQTAA4JT24XXW";
const url = "https://api.thingspeak.com/update";

async function sendFakeData() {
  // Simulated random readings
  const ldr = Math.floor(Math.random() * (700 - 200 + 1)) + 200; // 200–700
  const tilt = Math.random() > 0.8 ? 0 : 1; // occasionally tilt
  const fatigue = (ldr < 300 || tilt === 0) ? 1 : 0;

  const params = new URLSearchParams();
  params.append("api_key", writeKey);
  params.append("field1", ldr);
  params.append("field2", tilt);
  params.append("field3", fatigue);
  params.append("field4", new Date().toLocaleTimeString());

  try {
    const res = await axios.post(url, params);
    console.log(`✅ Uploaded: LDR=${ldr}, Tilt=${tilt}, Fatigue=${fatigue}`);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

// Send new data every 15 sec (ThingSpeak limit)
setInterval(sendFakeData, 15000);
sendFakeData();
