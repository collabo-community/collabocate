import { Request } from "express";
import { UserDocument, UserRole } from "../api/models/user.model";

export interface ReqUser extends Request {
  user?: {
    _id?: string;
    email?: string;
    role?: UserRole;
  }
}

export type Payload = Pick<UserDocument, "_id" | "email" | "role">;