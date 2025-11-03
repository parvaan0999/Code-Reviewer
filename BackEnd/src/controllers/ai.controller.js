const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  try {
    const { code, mode } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const response = await aiService(code, mode || "quick");
    res.json({ review: response });
  } catch (err) {
    console.error("❌ Controller Error:", err);
    res.status(500).json({ error: "Failed to get AI review" });
  }
};
