import mongoose from 'mongoose';
import { connectionType, afterDBconnectSuccessful, connectToDBunsuccessful } from './lib/helpers';
import { createAdminUserController } from './api/user/user.controller';

const mongooseConnect = async (port: number | string) => {
  try {
    await mongoose.connect(`${connectionType().uri}`);
    afterDBconnectSuccessful(port);
    createAdminUserController();
  } catch (err) {
    connectToDBunsuccessful(err);
  }
}

export default mongooseConnect;
