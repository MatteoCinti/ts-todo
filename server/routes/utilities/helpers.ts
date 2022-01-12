import { FilterQuery, Model, Schema } from 'mongoose';
import { IUser } from '../../db/schemas/user.schema';

export const findUser = async <T>(
  model: Model<T>,
  keyName: string,
  keyValue: string,
) => {
  const existingUser = await model.findOne({ [keyName]: keyValue } as FilterQuery<Schema>);
  if (existingUser) {
    return existingUser;
  }
  return false;
};

export const checkPassword = (existingUser: IUser, password: string): boolean => (
  existingUser.password === password
);
