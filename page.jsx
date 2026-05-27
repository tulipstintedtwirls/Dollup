
'use client';

import { useState } from "react";

export default function Page() {
  const [story, setStory] = useState("");
  const [scenes, setScenes] = useState([]);
  const [mode, setMode] = useState("both");
  const [ratio, setRatio] = useState(50);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/story", {
        method: "POST",
        body: JSON.stringify({ text: story })
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setScenes(data.scenes || []);
      }

    } catch (e) {
      setError("Failed to generate story");
    }

    setLoading(false);
  }

  return (
    <div style={{
      padding: 20,
      background: "#000",
      color: "#fff",
      minHeight: "100vh",
      fontFamily: "sans-serif"
    }}>

      <h1 style={{ fontSize: 28, marginBottom: 10 }}>
        Living Story AI ✨
      </h1>

      <textarea
        style={{
          width: "100%",
          height: 140,
          padding: 10,
          borderRadius: 8
        }}
        placeholder="Write or paste your story..."
        value={story}
        onChange={(e) => setStory(e.target.value)}
      />

      <button
        onClick={generate}
        style={{
          marginTop: 10,
          padding: "10px 15px",
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: 8
        }}
      >
        {loading ? "Generating cinematic scenes..." : "Generate Story"}
      </button>

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

      <div style={{ marginTop: 15 }}>
        <button onClick={() => setMode("book")}>Book</button>
        <button onClick={() => setMode("movie")}>Movie</button>
        <button onClick={() => setMode("both")}>Both</button>
      </div>

      {mode === "both" && (
        <input
          type="range"
          min="0"
          max="100"
          value={ratio}
          onChange={(e) => setRatio(e.target.value)}
        />
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: mode === "both"
          ? `${ratio}% ${100 - ratio}%`
          : "1fr",
        gap: 10,
        marginTop: 20
      }}>

        {(mode === "book" || mode === "both") && (
          <div style={{ background: "#111", padding: 10, borderRadius: 8 }}>
            <h3>📖 Book Mode</h3>
            {scenes.map((s, i) => (
              <p key={i}>{s.text}</p>
            ))}
          </div>
        )}

        {(mode === "movie" || mode === "both") && (
          <div style={{ background: "#222", padding: 10, borderRadius: 8 }}>
            <h3>🎬 Movie Mode</h3>
            {scenes.map((s, i) => (
              <div key={i} style={{ marginBottom: 10, background: "#000", padding: 10 }}>
                <div style={{
                  height: 120,
                  background: "#333",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  textAlign: "center"
                }}>
                  {s.visual}
                </div>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
