import express, { IRouter } from 'express';
import {
  signupWithLocalController,
  loginWithLocalController,
  signupOrLoginWithGithubController,
  signupOrLoginWithGoogleController,
} from './auth.controller';
import { authWithGithub } from '../middlewares/auth.middleware';
import { authWithGoogle } from '../middlewares/auth.middleware';

const router: IRouter = express.Router();

router.get("/github", authWithGithub);// route you would send a GET request to
router.get("/github/callback", signupOrLoginWithGithubController);// activated by modal screen

router.get("/google", authWithGoogle);// route you would send a GET request to
router.get("/google/callback", signupOrLoginWithGoogleController);// activated by modal screen

router.post('/signup', signupWithLocalController);
router.post('/login', loginWithLocalController);

export { router };