import express, { IRouter } from 'express';
import {
  getAllUsersController,
  getOneUserController,
  deleteOneUserController,
  updateOneUserPropertyValueController,
  updateUserPropertyValuesController,
  deleteAllUserController,
} from './user.controller';
import { UserRole } from './user.model';
import { authenticateUserWithJWT, authorizeByUserRoles } from '../auth/middlewares/auth.middleware';

const router: IRouter = express.Router();

router.get('/', authenticateUserWithJWT, authorizeByUserRoles([UserRole.Admin]), getAllUsersController);
router.get('/get-properties', authenticateUserWithJWT, authorizeByUserRoles([UserRole.Admin, UserRole.User]), getOneUserController);

router.patch('/update-any-property', authenticateUserWithJWT, authorizeByUserRoles([UserRole.Admin, UserRole.User]), updateOneUserPropertyValueController);
router.put('/update-properties', authenticateUserWithJWT, authorizeByUserRoles([UserRole.Admin, UserRole.User]), updateUserPropertyValuesController);

router.delete('/delete', authenticateUserWithJWT, authorizeByUserRoles([UserRole.User]), deleteOneUserController);

//-----------------------------------------------------//
router.delete('/', deleteAllUserController);
//-----------------------------------------------------//

export { router };