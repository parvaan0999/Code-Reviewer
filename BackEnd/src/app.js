const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai.routes");

const app = express();

app.use(
  cors({
    origin: [
      "https://code-reviewer-11.onrender.com", // frontend Render URL
      "http://localhost:5173", // local dev
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Code Review Backend Running ✅");
});

app.use("/ai", aiRoutes);

module.exports = app;
