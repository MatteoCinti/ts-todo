import { Schema, model, Document } from 'mongoose';
import { IUserNamePassword } from '../../../client/src/state/user/user.interfaces'

const schema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});

const User = model<IUserNamePassword>('User', schema);

export default User;