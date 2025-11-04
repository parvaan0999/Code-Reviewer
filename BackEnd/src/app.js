const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai.routes");

const app = express();

const corsOptions = {
  origin: "https://code-reviewer-11.onrender.com", // your frontend URL
  methods: ["GET","POST"]
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Code Review Backend Running ✅");
});

app.use("/ai", aiRoutes);

module.exports = app;
