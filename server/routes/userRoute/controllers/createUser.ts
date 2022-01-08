import { ObjectId } from 'mongoose';
import { IUser } from '../../../../common/interfaces'
import User from '../../../db/schemas/user.schema';
import { newError } from '../../utilities/errorHandling';
import { checkIfExisting } from '../../utilities/helpers';

interface ICreateUserReturn {
  userId: ObjectId,
  username: string,
  password: string
}

const createUser = async (username:string, password: string): Promise<ICreateUserReturn> => {
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