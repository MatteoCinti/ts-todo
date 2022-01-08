import { ObjectId } from "mongoose";

export interface IUsnmPass {
  username: string;
  password: string;
}
export interface IUser extends IUsnmPass{
  userId: ObjectId
}