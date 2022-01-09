import { IUserNamePassword } from '../../../../client/src/state/user/user.interfaces'
import User from "../../../db/schemas/user.schema";
import { newError } from "../../utilities/errorHandling";
import { checkIfExisting, checkPassword } from "../../utilities/helpers";

const validation = async (username:string, password: string): Promise<IUserNamePassword> => {
  const userExists = await checkIfExisting<IUserNamePassword>(User, 'username', username);
  const error = newError(`Username / Password combination not found`, 401);
  if(!userExists) {
    throw error;
  }
  const correctPassword = checkPassword<IUserNamePassword>(userExists, password);
  if(!correctPassword) {
    throw error;
  }
  return userExists;
}

const logIn = async (username:string, password: string): Promise<IUserNamePassword> => {
  try {
    const userExists = await validation(username, password);
    const {__v, ...result} = userExists['_doc'];
    return result
  } catch (error) {
    throw error;
  }
}

export default logIn;