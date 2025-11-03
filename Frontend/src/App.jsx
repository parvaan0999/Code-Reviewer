import { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum(a, b) {
  return a + b;
}`);
  const [review, setReview] = useState("");
  const [mode, setMode] = useState("quick");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, [review]);

  async function handleReview(selectedMode) {
    setMode(selectedMode);
    setLoading(true);
    setReview("");

    try {
      const response = await axios.post("http://localhost:5000/ai/get-review", {
        code,
        mode: selectedMode,
      });

      setReview(response.data.review || "No response received.");
    } catch (error) {
      console.error("Error fetching AI review:", error);
      setReview("❌ Failed to get review. Please check backend or API key.");
    }

    setLoading(false);
  }

  return (
    <main>
      {/* Left side: Code editor and buttons */}
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              height: "100%",
              width: "100%",
              background: "#0c0c0c",
              color: "#fff",
            }}
          />
        </div>

        {/* Mode buttons */}
        <div className="mode-buttons">
          <button
            className={`mode-btn ${mode === "quick" ? "active" : ""}`}
            onClick={() => handleReview("quick")}
          >
            ⚡ Quick Review
          </button>
          <button
            className={`mode-btn ${mode === "detailed" ? "active" : ""}`}
            onClick={() => handleReview("detailed")}
          >
            🧠 Detailed Review
          </button>
        </div>
      </div>

      {/* Right side: AI Review */}
      <div className="right">
        {loading ? (
          <p>⏳ Reviewing your code...</p>
        ) : (
          <div className="review-text">
            <ReactMarkdown
              rehypePlugins={[rehypeHighlight]}
              remarkPlugins={[remarkGfm]}
            >
              {review}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
