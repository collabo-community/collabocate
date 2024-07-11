import express, { IRouter } from 'express';
import { createIssueController, getAppController, getIssuesController, getPullRequestsController, getRepositoriesController } from '../controllers/app.controller';

const router: IRouter = express.Router();

router.get('/', getAppController);
//-------------------------------------------
router.get('/issues', getIssuesController);
//-------------------------------------------
router.post('/issues', createIssueController);
//-------------------------------------------
router.get('/pull-requests', getPullRequestsController);
//-------------------------------------------
router.get('/repositories', getRepositoriesController);

export { router };
