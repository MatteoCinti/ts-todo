import { IUser } from '../../../db/schemas/user.schema'
import User from "../../../db/schemas/user.schema";
import { newError } from "../../utilities/errorHandling";
import { findUser, checkPassword } from "../../utilities/helpers";

const validation = async (username:string, password: string): Promise<IUser> => {
  const userExists = await findUser<IUser>(User, 'username', username);
  const error = newError(`Username / Password combination not found`, 401);
  
  if(!userExists) {
    throw error;
  }
  const correctPassword = checkPassword<IUser>(userExists, password);
  if(!correctPassword) {
    throw error;
  }
  return userExists;
}

const retrieveUser = async (username:string, password: string): Promise<IUser> => {
  try {
    const userExists = await validation(username, password);
    const {__v, ...result} = userExists['_doc'];
    return result
  } catch (error) {
    throw error;
  }
}

const logIn = async (req, res, next) => {
  const { username, password } = req.body;
  if( !username || !password ) {
    const error = newError('Username or Password not set!', 400);
    return next(error);
  }

  try {
    const user = await retrieveUser(username, password);
    const userHiddenPassword = {
      ...user,
      password: 'hidden'
    }
    res.json( userHiddenPassword );
  } catch (error) {
    next(error);
  }
}

export default logIn;