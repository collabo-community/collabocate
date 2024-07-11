import { Request, Response } from 'express';
import { success } from '../lib/helpers';
import { createIssueService, getIssuesService, getPullRequestsService, getRepositoriesService } from './app.service';


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


let response: { [key: string]: unknown } = {};
const message = {
  success: {
    get: 'GET request successful!',
    issues: {
      submitted: 'Issue ticket successfully submitted!',
    },
  },
}

export const getIssuesController =  async (req: Request, res: Response) => {
  const docs = await getIssuesService();
  response = {
    count: docs.length,
    issues: docs,
  }
  success(message.success.get);
  return res.status(200).json(response);
}

export const createIssueController =  async (req: Request, res: Response) => {
  const docs = await createIssueService(req);
  response = {
    message: message.success.issues.submitted,
    issue: docs,
  }
  success(message.success.issues.submitted);
  return res.status(201).json(response);
}

export const getPullRequestsController =  async (req: Request, res: Response) => {
  const docs = await getPullRequestsService();
  response = {
    count: docs.length,
    pull_requests: docs,
  }
  success(message.success.get);
  return res.status(200).json(response);
}

export const getRepositoriesController =  async (req: Request, res: Response) => {
  const docs = await getRepositoriesService();
  response = {
    count: docs.length,
    repositories: docs,
  }
  success(message.success.get);
  return res.status(200).json(response);
}