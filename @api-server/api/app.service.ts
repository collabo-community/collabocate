import { Request } from 'express';
import { unauthorizedErr } from '../lib/errors/Errors';

export const getIssuesService =  async () => {
    const response = await fetch(`${process.env.REPO_API_URL}/issues`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        },
    });
    if (response.status === 401) {
      unauthorizedErr("Unauthorized: Can't access this resource");
  }
    const data = await response.json();
    return data;
}
  
export const createIssueService =  async (req: Request) => {
    const { title, body } = req.body;
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

    if (response.status === 401) {
     unauthorizedErr("Unauthorized: Can't access this resource");
  }

    const data = await response.json();
    return data;
}
  
export const getPullRequestsService =  async () => {
    const response = await fetch(`${process.env.REPO_API_URL}/pulls`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        },
    });

    if (response.status === 401) {
      unauthorizedErr("Unauthorized: Can't access this resource");
  }

    const data = await response.json();
    return data;
}

export const getRepositoriesService =  async () => {
    const response = await fetch(`${process.env.GITHUB_API_BASE_URL}/user/repos`, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
          },
        }
    );

    if (response.status === 401) {
      unauthorizedErr("Unauthorized: Can't access this resource");
  }

    const data = await response.json();
    return data;
}

export const getIssueTemplatesService = async () => {

  const response = await fetch(`${process.env.REPO_API_URL}/contents/.github/ISSUE_TEMPLATE`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
  });

  if (response.status === 401) {
    unauthorizedErr("Unauthorized: Can't access this resource");
  }

  const data = await response.json();
  return data;
}