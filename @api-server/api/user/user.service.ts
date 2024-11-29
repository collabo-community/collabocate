import { badRequestErr, notFoundErr } from '../../lib/errors/Errors';
import { UserDocument, UserModel as User, UserRole } from './user.model';


export const getAllUsersService = async () => {
  const query = await User.find({role:{$ne: UserRole.Admin}}).exec();
  return query;
};

export const getOneUserService = async (paramsId: string) => {
  const query = await User.findById(paramsId).exec();
  if(!query){
    notFoundErr('No record found for provided ID');
  }
  return query;
};

export const deleteOneUserService = async (paramsId: string) => {
  const query = await User.deleteOne({ _id: paramsId }).exec();
  if (query.deletedCount < 1){
    notFoundErr('No record found for provided ID to be deleted')
  }
  return query;
}

export const updateOneUserPropertyValueService = async (paramsId: string, requestBody: { propName: string, value: string }[]) => {
  const query = await User.findById(paramsId).exec();
  if(!query){
    notFoundErr('No record found for provided ID');
  }

  for (const ops of requestBody) {
    if(!(ops.propName in query)){
      badRequestErr(`invalid property: ${ops.propName}`);
    }
    query[ops.propName as keyof UserDocument] = ops.value as never;
  }

  const updatedQuery = await query.save();
  return updatedQuery;
};

export const updateUserPropertyValuesService = async (paramsId: string, requestBody: UserDocument) => {
  const query = await User.findById(paramsId).exec();
  if(!query){
    notFoundErr('No record found for provided ID');
  }

  query.password = requestBody.password;

  const updatedQuery = await query.save();
  return updatedQuery;
};

export const createAdminUserService = async () => {
  let adminUser = await User.findOne({ role: UserRole.Admin }).exec();
  if (!adminUser) {
    const createAdminUser = new User({
      email: "admin@admin.com",
      password: "admin",
      role: UserRole.Admin,
    }); 
    adminUser = await createAdminUser.save();
  }
  return adminUser;
};

//--------------------------------------------------------------------------------------------------//
export const deleteAllUserService = async () => {
  const query = await User.deleteMany().exec();
  if (query.deletedCount < 1){
    notFoundErr('No record found to be deleted')
  }
  return query;
}
//--------------------------------------------------------------------------------------------------//