import User, { IUser } from '../../../db/schemas/user.schema';
import { newError } from '../../utilities/errorHandling';
import { findUser } from '../../utilities/helpers';

export const createUser = async (username:string, password: string) => {
  try {
    const userExists = await findUser(User, 'username', username);
    if (userExists) {
      const error = newError(`Username ${username} already exists`, 409);
      throw error;
    }

    const newUser = await User.create({ username, password });
    return {
      ...newUser['_doc'],
    }
  } catch (error) {
    throw error;
  }
};

const register = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    const error = newError('Username or Password not set!', 400);
    return next(error);
  }

  try {
    const newUser = await createUser(username, password);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export default register;
