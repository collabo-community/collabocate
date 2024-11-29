import { NextFunction, Response } from "express";
import passport from 'passport';
import { Payload, ReqUser } from '../../../types';
import { UserRole } from "../../user/user.model";
import { unAuthorizedErr } from '../../../lib/errors/Errors';

// -----------------------------------------------------------------------------------------------------------//
// https://www.sailpoint.com/identity-library/difference-between-authentication-and-authorization/
// AUTHENTICATION is the process of verifying who someone is (This is done during SIGNUP, LOGIN, and JWT)
// AUTHORIZATION is the process of verifying what specific applications, files, and data a user 
//               has access to (Usually by ROLES)
// -----------------------------------------------------------------------------------------------------------//

export const authenticateUserWithJWT = (req: ReqUser, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', {session: false},
    (err: Error, payload: Payload, info: { message: string }) => {
      try {
        if (err) {
        throw err
        }
        if (info) {
          unAuthorizedErr(info.message)
        }
        if (!payload) {
          unAuthorizedErr("[UNAUTHORIZED] Unknown User Trying to Access This Route\nRedirecting To Login Page")
        }
        const { _id, email, role} = payload;
        req.user = { _id: _id, email: email, role: role}; // replace the req.user parameter with the payload
        return next();
        
      } catch (err) {
        next(err);
      }
    }
  )(req, res, next);
}


export const authorizeByUserRoles = (allowedRoles: UserRole[]) => {
  return (req: ReqUser, res: Response, next: NextFunction) => {
    try {
      const { role } = req.user;
      const roleIsVerified = allowedRoles.includes(role);
      if (roleIsVerified) {
        return next();
      }
      unAuthorizedErr(`only [${allowedRoles}] have access to this route`);

    } catch (err) {
      next(err)
    }
  }
}

export const authWithGoogle = (req: ReqUser, res: Response, next: NextFunction) => {
  passport.authenticate('google', {session: false},
    () => {
    //nothing to do here for now
  }) (req, res, next)
};

export const authWithGithub = (req: ReqUser, res: Response, next: NextFunction) => {
  passport.authenticate('github', {session: false},
    () => {
    //nothing to do here for now
  }) (req, res, next)
};