import {Strategy} from 'passport-local';
import { UserModel as User } from '../../../user/user.model';
import bcrypt from 'bcrypt';
import { DoneCallback } from 'passport';
import { badRequestErr } from '../../../../lib/errors/Errors';
import { success } from '../../../../lib/helpers';

export const localLoginStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email: string, password: string, done: DoneCallback)=>{
    try {
      const user = await User.findOne({email: email}).exec();
      if (!user) {
        badRequestErr("Invalid Credentials [email]")
      }
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        badRequestErr("Invalid Credentials [password]")
      }
      success(`${email} just logged in`);
      done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);