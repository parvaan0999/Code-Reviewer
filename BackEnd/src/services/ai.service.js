const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async function getAIReview(code, mode) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt =
      mode === "quick"
        ? `You are an experienced code reviewer.
Give a **short and clear markdown-formatted review (under 100 words)** for this code.
Include:
- Main issue (if any)
- One suggestion for improvement
- A corrected version (in \`\`\`code block\`\`\`)
Code:
${code}`
        : `You are an expert senior developer performing a code review.
Provide a **well-structured markdown-formatted analysis** including these sections:
### 🧠 Understanding
### ⚠️ Issues Found
### 🛠️ Suggestions
### ✅ Corrected Code
### 📊 Time & Space Complexity
### 🚀 Performance Tips

Here is the code to review:
${code}`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("❌ Gemini API Error:", err);
    throw err;
  }
};

// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// module.exports = async function getAIReview(code, mode) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const prompt =
//       mode === "quick"
//         ? `Give a short and direct review (under 100 words) for this code:
// ${code}`
//         : `Provide a detailed analysis of the following code including:
//         1. Errors or issues in the code
// 2. Corrected version of the code
// 3. Time and space complexity analysis
// 4. Performance tips
// Code:
// ${code}`;

//     const result = await model.generateContent(prompt);
//     return result.response.text();
//   } catch (err) {
//     console.error("❌ Gemini API Error:", err);
//     throw err;
//   }
// };
