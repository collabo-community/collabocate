import { Request, Response } from 'express';


export interface ApiInfo {
  name: string;
  description: string;
  built_at: string;
  github: {
    repository: string;
  };
  contributors: {
    count: number;
    list: string[];
  };
}

const contributors: string[] = ['Kehinde Bandipo', 'Mary Obiagba'];

export const getAppController =  async (req: Request, res: Response) => {
    const apiInfo: ApiInfo = {
      name: 'Collabocate API',
      description: 'Live updates to and from Github REST API',
      built_at: 'Collabo Community [Code Collabo tech arm]',
      github: {
        repository: 'https://github.com/collabo-community/collabocate',
      },
      contributors: {
        count: contributors.length,
        list: contributors,
      },
    };
    res.status(200).json(apiInfo);
}

export const getIssuesController =  async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${process.env.REPO_API_URL}/issues`, {
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
}

export const createIssueController =  async (req: Request, res: Response) => {
  const { title, body } = req.body;
  try {
    const response = await fetch(`${process.env.REPO_API_URL}/issues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ 
        title: `[GitHubSync] ${title}`,
        body: body + '\n\n' + '#' + '\n' + '> Submitted via **Collabocate** [[GitHubSync]](https://github.com/collabo-community/collabocate)',
      }),
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
}

export const getPullRequestsController =  async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${process.env.REPO_API_URL}/pulls`, {
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
}

export const getRepositoriesController =  async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      `${process.env.GITHUB_API_BASE_URL}/user/repos`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching repositories");
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching repositories" });
  }
}