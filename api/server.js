// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import route
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Jalankan server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Cloudia API running on port ${PORT}`));
