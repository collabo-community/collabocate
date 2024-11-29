import { NextFunction, Request, Response } from 'express';
import {
  getAllUsersService,
  getOneUserService,
  deleteOneUserService,
  updateOneUserPropertyValueService,
  updateUserPropertyValuesService,
  deleteAllUserService,
  createAdminUserService,
} from './user.service';
import { success } from '../../lib/helpers';
import { ReqUser } from '../../types';
import { error } from 'console';

// const routeName = 'user';
// const item = `${routeName}-item`;

let response: { [key: string]: unknown } = {};

export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsersService();
    response = {
      success: true,
      data: {
        count: users.length,
        users: users.map(user => {
          return {
            _id: user._id,
            email: user.email,
            email_verified: user.email_verified,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          }
        })
      },
      message: `SUCCESS: All users succesfully retrieved`,
    };
    success(`SUCCESS: All users succesfully retrieved`);
    return res.status(200).json(response);
    
  } catch (err) {
    next(err);
  }
}

export const getOneUserController = async (req: ReqUser, res: Response, next: NextFunction) => {
  try {
    const user = await getOneUserService(req.user._id);
    const response = {
      success: true,
      data: {
        user: {
          _id: user._id,
          email: user.email,
          email_verified: user.email_verified,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      },
      message: `SUCCESS: User succesfully retrieved`,
    };
    success(`SUCCESS: User succesfully retrieved`);
    return res.status(200).json(response);
    
  } catch (err) {
    next(err);
  }
}

export const deleteOneUserController = async (req: ReqUser, res: Response, next: NextFunction) => {
  try {
    await deleteOneUserService(req.user._id);
    response = {
      success: true,
      data: {},
      message: `SUCCESS: User successfully deleted`,
    };
    success(`SUCCESS: User successfully deleted`);
    return res.status(201).json(response);
    
  } catch (err) {
    next(err);
  }
};

export const updateOneUserPropertyValueController = async (req: ReqUser, res: Response, next: NextFunction) => {
  try {
    const id: string = req.user._id;
    await updateOneUserPropertyValueService(req.user._id, req.body);
    response = {
      success: true,
      data: {},
      message: `PATCH update request for ID ${id} successful!`,
    };
    success(`PATCH update request for ID ${id} successful!`);
    return res.status(200).json(response);
    
  } catch (err) {
    next(err);
  } 
}

export const updateUserPropertyValuesController = async (req: ReqUser, res: Response, next: NextFunction) => {
  try {
    const id: string = req.user._id;
    await updateUserPropertyValuesService(req.user._id, req.body);
    response = {
      success: true,
      data: {},
      message: `PUT update request for ID ${id} successful!`,
    };
    success(`PUT update request for ID ${id} successful!`);
    return res.status(200).json(response);
    
  } catch (err) {
    next(err);
  }
}

export const createAdminUserController = async () => {
  try {
    await createAdminUserService();
  } catch (err) {
    error(`ERROR: Could not Find or Create An Admin User\n${err.message}`);
  }
}

//------------------------------------------------------------------------------------------//
export const deleteAllUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await deleteAllUserService();
    const response = {
      success: true,
      data: {},
      message: `${user.deletedCount} user(s) deleted successfully!`,
    };
    success(response.message);
    return res.status(201).json(response);
    
  } catch (err) {
    next(err);
  }
};
//------------------------------------------------------------------------------------------//