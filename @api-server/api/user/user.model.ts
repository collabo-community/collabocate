import mongoose from 'mongoose';
import bcrypt from "bcrypt";

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export interface UserDocument extends mongoose.Document {
  _id?: string;
  email: string;
  email_verified: boolean;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

const collectionName = 'user';

const UserSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide valid email",
    ]
  },
  email_verified: { type: Boolean, required:true, default: false},
  password: { type: String, required: true },
  role: { type: String, required: true, default: UserRole.User}
},
{
  timestamps: true,
});

UserSchema.pre('save', async function(next){
  // Only run this function if password was moddified (not on other update functions)
  if (!this.isModified("password")){
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  return next();
})

const UserModel = mongoose.model<UserDocument>(collectionName, UserSchema, collectionName); //declare collection name a second time to prevent mongoose from pluralizing or adding 's' to the collection name

export { UserModel };