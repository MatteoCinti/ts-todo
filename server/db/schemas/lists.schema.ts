import { Schema } from 'mongoose';
import { ISingleList } from '../../../client/src/state/todoLists/todoLists.interfaces';
import singleTodoSchema from './singleTodo.schema';

export interface ISingleListDB extends ISingleList {
  todos: []
}

const todoListsSchema = new Schema<ISingleListDB>({
  name: { type: String, required: true },
  category: String,
  isSelected: {
    type: Boolean,
    default: false,
  },
  todos: [singleTodoSchema],
});

export { ISingleList };
export default todoListsSchema;
