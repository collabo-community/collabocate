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