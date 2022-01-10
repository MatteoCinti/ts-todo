import { Schema, model } from 'mongoose';
import { ITodo } from '../../../client/src/state/todoElement.ts/todoElement.interfaces';


const singleTodoSchema = new Schema<ITodo> ({
  name: {type: String, required: true},
  index: Number,
  isCompleted: {
    type: Boolean,
    default: false
  },
  role: {type: String, required: true},
});


export { ITodo }
export default singleTodoSchema;