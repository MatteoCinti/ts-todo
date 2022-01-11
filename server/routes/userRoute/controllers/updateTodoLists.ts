import { ISingleList } from "../../../db/schemas/lists.schema";
import User, { IUser } from "../../../db/schemas/user.schema";
import { newError } from "../../utilities/errorHandling";

const findAndUpdate = async (username:string, newListPayload: ISingleList[] ) : Promise<IUser> => {
  return await User.findOneAndUpdate( 
    { username },
    { "$set": { todoLists: newListPayload } },
    { new: true }
  )
}
const updateTodoLists = async (req, res, next): Promise<ISingleList[]> => {
  try {
    const { username } = req.params;
    const { todoLists } = req.body.todoLists;
    if( !username || !todoLists ) {
      const error = newError('Missing a required parameter!', 400);
      return next(error);
    }
    
    const updatedState = await findAndUpdate(username, todoLists);
    res.status(201).json(updatedState);
  } catch (error) {
    next(error); 
  }
}

export default updateTodoLists;