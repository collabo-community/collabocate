import {Strategy} from 'passport-local';
import { UserModel as User } from '../../../user/user.model';
import { DoneCallback } from 'passport';
import { success } from '../../../../lib/helpers';

export const localSignupStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email: string, password: string, done: DoneCallback)=>{
    try {
      const createUser = new User({
        email: email,
        password: password,
      });
      const user = await createUser.save();
      success(`${email} just signed up`);
      done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);