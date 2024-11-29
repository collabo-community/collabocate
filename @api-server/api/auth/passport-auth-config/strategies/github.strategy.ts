
import {Profile, Strategy} from 'passport-github2';
import { UserModel as User } from '../../../user/user.model';
import { DoneCallback } from 'passport';
import { badRequestErr } from '../../../../lib/errors/Errors';
import { success } from '../../../../lib/helpers';

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const dotEnv = dotenv.config();
dotenvExpand.expand(dotEnv);

export const githubStrategy = new Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    callbackURL: `${process.env.BACKEND_URL as string}/auth/github/callback`,
    scope: ['email']
  },
  async (accessToken: string, refreshToken: string, profile: Profile, done: DoneCallback)=>{
    try {
      // console.log(profile);
      // success(`ACCESS_TOKEN: ${accessToken}`);
      // success(`REFRESH_TOKEN: ${refreshToken}`);

      // check if email is part of the returned properties of the github user profile
      const user_email = profile.emails[0].value
      if (!user_email) {
        badRequestErr("Email not Found in Github User Profile\nPlease make your email publicly available");
      }
      let user = await User.findOne({ email: user_email }).exec();
      if (user) {
        if (!user.email_verified) {
          user.email_verified = true;
          user = await user.save()
        }
        success(`${user_email} just logged in`);
      }
      else {
        const createUser = new User({
          email: user_email,
          email_verified: true,
          password: 12345, // default password (it can be changed later)
        });
        user = await createUser.save();
        success(`${user_email} just signed up`);
      }
      return done(null, user);

    } catch (err) {
      return done(err);
    }
  }
);
