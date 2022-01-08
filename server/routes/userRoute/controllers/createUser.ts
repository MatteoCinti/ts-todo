import { ObjectId } from 'mongoose';
import { IUser, IUsnmPass } from '../../../../common/interfaces'
import User from '../../../db/schemas/user.schema';
import { newError } from '../../utilities/errorHandling';
import { checkIfExisting } from '../../utilities/helpers';
import logIn from './logIn';

const createUser = async (username:string, password: string): Promise<IUser> => {
  try {
    const userExists = await checkIfExisting<IUser>(User, 'username', username);
    if(userExists) {
      const error = newError(`Username ${username} already exists`, 409);
      throw error;
    }
    const newUser = new User ({
      username,
      password
    })
    newUser.save();
    
    return {
      ...newUser['_doc']
    }
  } catch (error) {
    throw error;
  }
}

export default createUser;