import User from '../../../db/schemas/user.schema';
import { newError } from '../../utilities/errorHandling';
import { findUser } from '../../utilities/helpers';

const findAndDelete = async (username:string, listId: string) : Promise<boolean> => {
  const res = await User.updateOne(
    { username },
    { $pull: { todoLists: { _id: listId } } },
  );
  return res.modifiedCount === 1;
};

const removeList = async (req, res, next): Promise<void> => {
  try {
    const { username, listId } = req.params;

    const wasDeleted = await findAndDelete(username, listId);
    if (!wasDeleted) {
      const error = newError('entry not found', 400);
      throw error;
    }
    const newUserObj = await findUser(User, 'username', username);
    if (!newUserObj) {
      const error = newError('user entry not found', 400);
      throw error;
    }
    const { todoLists } = newUserObj;

    res.status(201).json(todoLists);
  } catch (error) {
    next(error);
  }
};

export default removeList;
