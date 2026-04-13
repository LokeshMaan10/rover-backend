const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let latestData = {};
let control = 1;

// ✅ ESP32 sends data
app.post('/data', (req, res) => {
    latestData = req.body;
    console.log("ESP32:", latestData);
    res.send("OK");
});

// ✅ Dashboard gets data
app.get('/data', (req, res) => {
    res.json(latestData);
});

// ✅ Dashboard sends control
app.post('/control', (req, res) => {
    control = req.body.state;
    console.log("Control:", control);
    res.send("OK");
});

// ✅ ESP32 reads control
app.get('/control', (req, res) => {
    res.json({ state: control });
});

// ✅ Health check (important for deployment)
app.get('/', (req, res) => {
    res.send("Server running 🚀");
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});