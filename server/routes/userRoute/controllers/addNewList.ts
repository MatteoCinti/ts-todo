import { ISingleList } from "../../../db/schemas/lists.schema";
import User, { IUser } from "../../../db/schemas/user.schema";
import { newError } from "../../utilities/errorHandling";

const findAndUpdate = async (username:string, newListPayload: ISingleList ) : Promise<IUser> => {
  return await User.findOneAndUpdate( 
    { username },
    { $push: { todoLists: newListPayload }},
    { new: true }
  )      
}

const addNewList = async (req, res, next): Promise<ISingleList[]> => {
  const { username } = req.params;
  const { listName } = req.body;
  if( !username || !listName ) {
    const error = newError('Missing a required parameter!', 400);
    return next(error);
  }

  const newListPayload: ISingleList = {
    name: listName,
    todos: []
  }
  const { todoLists } = await findAndUpdate(username, newListPayload)
  res.status(201).json(todoLists);
}

export default addNewList;