import { Schema, model, Document } from 'mongoose';
import { IUser } from '../../../common/interfaces'

const schema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});

const User = model<IUser>('User', schema);

export default User;