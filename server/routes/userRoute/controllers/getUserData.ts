import { ISingleList } from "../../../db/schemas/lists.schema";
import User, { IUser } from "../../../db/schemas/user.schema";
import { newError } from "../../utilities/errorHandling";

export const findOne = async (username:string) : Promise<IUser> => {
  return await User.findOne({ username });      
}

const getUserData = async (req, res, next): Promise<ISingleList[]> => {
  try {
    const { username } = req.params;
    console.log("🚀 ~ file: getUserData.ts ~ line 12 ~ getUserData ~ username", username)
    
    if( !username ) {
      const error = newError('Missing username!', 400);
      return next(error);
    }
    const response = await findOne(username);  
    console.log("🚀 ~ file: getUserData.ts ~ line 19 ~ getUserData ~ response", response)
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

export default getUserData;