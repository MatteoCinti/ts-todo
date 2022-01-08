import { errorMonitor } from 'events';
import { Router } from 'express';
import { json } from 'stream/consumers';
import { newError } from '../utilities/errorHandling';
import createUser from './controllers/createUser';

const router = Router();

router.post('/', async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password)
  if( !username || !password ) {
    const error = newError('Username or Password not set!', 400);
    return next(error);;
  }

  try {
    const newUser = await createUser(username, password);

    console.log("🚀 ~ file: userRouter.ts ~ line 20 ~ router.post ~ newUser", newUser)
    res.json( newUser );
  } catch (error) {
    next(error);
  }
});

export default router;
