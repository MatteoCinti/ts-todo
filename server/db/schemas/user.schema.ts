import { Schema, model, Document, Model } from 'mongoose';
import { IUser } from '../../../client/src/state/user/user.interfaces'
import todoLists from './lists.schema';

const schema = new Schema ({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  todoLists: [todoLists]
});

const User = model<IUser>('User', schema);

export { IUser };
export default User;