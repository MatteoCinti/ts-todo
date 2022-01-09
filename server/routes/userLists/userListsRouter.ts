import { Router } from 'express';
import { newError } from '../utilities/errorHandling';

const router = Router();

router.put('/', async (req, res, next) => {
  const { userId, listName } = req.body;
  if( !userId || !listName ) {
    const error = newError('Missing a required parameter!', 400);
    return next(error);
  }

  console.log(userId, listName)

})