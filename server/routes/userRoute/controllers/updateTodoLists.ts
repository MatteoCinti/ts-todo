import { ISingleList } from "../../../db/schemas/lists.schema";
import User, { IUser } from "../../../db/schemas/user.schema";
import { newError } from "../../utilities/errorHandling";
import { findOne } from "./getUserData";

const findAndUpdate = async (username:string, newListPayload: ISingleList[] ) : Promise<IUser> => {
  // console.log("🚀 ~ file: updateTodoLists.ts ~ line 7 ~ findAndUpdate ~ newListPayload", newListPayload)
  return await User.findOneAndUpdate( 
    { username },
    { "$set": { todoLists: newListPayload } },
    { new: true }
  )
}
// Promise<ISingleList[]>
const updateTodoLists = async (req, res, next): Promise<any> => {
  try {
    const { username } = req.params;
    const { todoLists } = req.body.todoLists;
    // console.log("🚀 ~ file: updateTodoLists.ts ~ line 19 ~ updateTodoLists ~ todoLists", todoLists)
    if( !username || !todoLists ) {
      const error = newError('Missing a required parameter!', 400);
      return next(error);
    }
    
    const updatedState = await findAndUpdate(username, todoLists);
    // console.log("🚀 ~ file: updateTodoLists.ts ~ line 25 ~ updateTodoLists ~ todoLists", todoLists)
    res.status(201).json(updatedState);
  } catch (error) {
    next(error); 
  }
}

export default updateTodoLists;