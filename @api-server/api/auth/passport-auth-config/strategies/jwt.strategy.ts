import {ExtractJwt, Strategy} from 'passport-jwt';
import { DoneCallback } from 'passport';
import { Payload } from '../../../../types';

import dotenv from 'dotenv';
dotenv.config();

export const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
  async (payload: Payload, done: DoneCallback)=>{
    try {
      return done(null, payload);
    } catch (err) {
      return done(err);
    }
  }
);