import { FilterQuery, Model, Schema } from "mongoose";

export const checkIfExisting = async <T>(model: Model<T>, keyName: string, keyValue: string): Promise<false | T> => {
  const existingUser = await model.findOne({ [keyName]: keyValue } as FilterQuery<Schema>);
  if(existingUser) {
    return existingUser;
  }
  return false;
}

export const checkPassword = <T>(existingUser: T, password: string): boolean=> (
  existingUser['password'] === password
)