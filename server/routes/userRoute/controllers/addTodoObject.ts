import { ITodo } from "../../../db/schemas/singleTodo.schema";
import User from "../../../db/schemas/user.schema";
import { newError } from "../../utilities/errorHandling";

const findAndAddTodo = async (username:string, listId: string, newListPayload: ITodo ) : Promise<any> => {
  return await User
    .findOneAndUpdate(
      { username, 'todoLists._id': listId }, 
      {$push: {'todoLists.$.todos': newListPayload} }, 
      {new: true}
    );
}


const addNewTodo = async (req, res, next): Promise<ITodo[]> => {
  try {
    const { username, listId } = req.params;
    const { todoObject } = req.body;
    if( !todoObject ) {
      const error = newError('Missing a required parameter!', 400);
      return next(error);
    }

    const { todoLists } = await findAndAddTodo(username, listId, todoObject);
    
    res.status(201).json(todoLists);
  } catch (error) {
    next(error);
  }
}

export default addNewTodo;