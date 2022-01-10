import { ISingleList } from '../../../client/src/state/todoLists/todoLists.interfaces';

import { Schema, model } from 'mongoose';

const todoListsSchema = new Schema<ISingleList> ({
  name: {type: String, required: true},
  category: String,
  isSelected: {
    type: Boolean,
    default: false
  },
  todos: []
});

const todoLists = model<ISingleList>('todoLists', todoListsSchema);

export { ISingleList };
export default todoListsSchema;