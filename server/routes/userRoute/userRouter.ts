import { Router } from 'express';
import { newError } from '../utilities/errorHandling';
import createUser from './controllers/createUser';
import logIn from './controllers/logIn';

const router = Router();

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
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

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  if( !username || !password ) {
    const error = newError('Username or Password not set!', 400);
    return next(error);;
  }

  try {
    const user = await logIn(username, password);
    console.log("🚀 ~ file: userRouter.ts ~ line 20 ~ router.post ~ newUser", user)
    res.json( user );
  } catch (error) {
    next(error);
  }
});

export default router;
