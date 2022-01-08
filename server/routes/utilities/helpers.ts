import { FilterQuery, Model, Schema } from "mongoose";

export const checkIfExisting = async <T>(model: Model<T>, keyName: string, keyValue: string): Promise<boolean> => {
  const existingUser = await model.findOne({ [keyName]: keyValue } as FilterQuery<Schema>);
  if(existingUser) {
    return true;
  }
  return false;
}