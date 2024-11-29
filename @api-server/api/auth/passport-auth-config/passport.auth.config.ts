import {Application} from 'express';
import passport from 'passport';
import { localLoginStrategy } from './strategies/local.login.strategy';
import { localSignupStrategy } from './strategies/local.signup.strategy';
import { jwtStrategy } from './strategies/jwt.strategy';
import { googleStrategy } from './strategies/google.strategy';
import { githubStrategy } from './strategies/github.strategy';

export const configurePassport = (app: Application) => {
  passport.use('local-signup',localSignupStrategy); // basic signup with email and password
  passport.use('local-login',localLoginStrategy); // basic login with email and password
  passport.use(jwtStrategy); // used to extract bearer token 
  passport.use(googleStrategy); // signup and login with google Oauth2
  passport.use(githubStrategy); // signup and login with github Oauth2
  app.use(passport.initialize());
}