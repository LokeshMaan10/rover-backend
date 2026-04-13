const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ===== GLOBAL STORAGE =====
let latestData = {};
let control = 1;

// ===== ESP32 SEND DATA =====
app.post('/data', (req, res) => {
    latestData = req.body;
    console.log("ESP32 Data Received:", latestData);
    res.send("OK");
});

// ===== DASHBOARD GET DATA =====
app.get('/data', (req, res) => {
    console.log("Sending to Dashboard:", latestData); // 🔥 debug
    res.json(latestData);
});

// ===== DASHBOARD SEND CONTROL =====
app.post('/control', (req, res) => {
    control = req.body.state;
    console.log("Control Updated:", control);
    res.send("OK");
});

// ===== ESP32 READ CONTROL =====
app.get('/control', (req, res) => {
    res.json({ state: control });
});

// ===== HEALTH CHECK =====
app.get('/', (req, res) => {
    res.send("Server running 🚀");
});

// ===== IMPORTANT FOR RENDER =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});