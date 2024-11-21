import express, { IRouter } from 'express';
import { createIssueController, getAppController, getIssuesController, getPullRequestsController, getRepositoriesController,getIssueTemplatesController } from './app.controller';

const router: IRouter = express.Router();

router.get('/', getAppController);
router.get('/issues', getIssuesController);
//-------------------------------------------
router.post('/issues', createIssueController);
//-------------------------------------------
router.get('/issue-templates', getIssueTemplatesController);
router.get('/pull-requests', getPullRequestsController);
router.get('/repositories', getRepositoriesController);

export { router };
