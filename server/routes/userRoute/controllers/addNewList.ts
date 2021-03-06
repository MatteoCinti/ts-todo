import { ISingleListDB } from '../../../db/schemas/lists.schema';
import User, { IUser } from '../../../db/schemas/user.schema';
import { newError } from '../../utilities/errorHandling';

const findAndAddList = async (
  username:string,
  newListPayload: ISingleListDB,
) : Promise<IUser> => User.findOneAndUpdate(
  { username },
  { $push: { todoLists: newListPayload } },
  { new: true },
);

const unselectAllLists = async (username:string) => User.findOneAndUpdate(
  { username, 'todoLists.isSelected': true },
  { $set: { 'todoLists.$.isSelected': false } },
);

const addNewList = async (req, res, next): Promise<ISingleListDB[]> => {
  try {
    const { username } = req.params;
    const { listName } = req.body;
    if (!username || !listName) {
      const error = newError('Missing a required parameter!', 400);
      return next(error);
    }
    const newListPayload: ISingleListDB = {
      name: listName,
      isSelected: true,
      todos: [],
    };
    await unselectAllLists(username);
    const { todoLists } = await findAndAddList(username, newListPayload);
    res.status(201).json(todoLists);
  } catch (error) {
    next(error);
  }
};

export default addNewList;
