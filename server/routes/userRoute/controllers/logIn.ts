import { IUser } from "../../../../common/interfaces";
import User from "../../../db/schemas/user.schema";
import { newError } from "../../utilities/errorHandling";
import { checkIfExisting } from "../../utilities/helpers";

const logIn = async (username:string, password: string): Promise<IUser> => {
  try {
    const userExists = await checkIfExisting<IUser>(User, 'username', username);
    if(!userExists) {
      const error = newError(`Username ${username} not found`, 404);
      throw error;
    }
    const {__v, ...result} = userExists['_doc'];
    return result
  } catch (error) {
    throw error;
  }
}

export default logIn;