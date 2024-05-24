import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public")); // Serve static files from the 'public' directory

const PORT = process.env.PORT || 3000;
const GITHUB_API_URL =
  "https://api.github.com/repos/KBandipo/GitHub-REST-API/issues";

// Endpoint to get issues
app.get("/issues", async (req, res) => {
  try {
    const response = await fetch(GITHUB_API_URL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching issues" });
  }
});

// Endpoint to create a new issue
app.post("/issues", async (req, res) => {
  const { title, body } = req.body;
  try {
    const response = await fetch(GITHUB_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ title, body }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create issue! Status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error creating issue" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
