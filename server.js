import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public")); // Serve static files from the 'public' directory

const PORT = process.env.PORT || 3000;

// Endpoint to get issues
app.get("/issues", async (req, res) => {
  try {
    const response = await fetch(`${process.env.GITHUB_API_URL}/issues`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching issues");
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching issues" });
  }
});

// Endpoint to create a new issue
app.post("/issues", async (req, res) => {
  const { title, body } = req.body;
  try {
    const response = await fetch(`${process.env.GITHUB_API_URL}/issues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ title, body }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        data.message || `Failed to create issue! Status: ${response.status}`
      );
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error creating issue" });
  }
});

// Endpoint to get pull requests
app.get("/pull-requests", async (req, res) => {
  try {
    const response = await fetch(`${process.env.GITHUB_API_URL}/pulls`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching pull requests");
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pull requests" });
  }
});

// Endpoint to get public repositories
app.get("/repositories", async (req, res) => {
  try {
    const response = await fetch(process.env.GITHUB_REPOS_API_URL, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching repositories");
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching repositories" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
