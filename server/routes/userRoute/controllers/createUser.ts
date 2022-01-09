import { ObjectId } from 'mongoose';
import { IUserNamePassword } from '../../../../client/src/state/user/user.interfaces'
import User from '../../../db/schemas/user.schema';
import { newError } from '../../utilities/errorHandling';
import { checkIfExisting } from '../../utilities/helpers';
import logIn from './logIn';

const createUser = async (username:string, password: string): Promise<IUserNamePassword> => {
  try {
    const userExists = await checkIfExisting<IUserNamePassword>(User, 'username', username);
    if(userExists) {
      const error = newError(`Username ${username} already exists`, 409);
      throw error;
    }
    const newUser = new User ({
      username,
      password
    })
    await newUser.save();
    
    return {
      ...newUser['_doc']
    }
  } catch (error) {
    throw error;
  }
}

export default createUser;