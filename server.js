require('dotenv').config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/notes", require("./routes/notes"));

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, HOST, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
