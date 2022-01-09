import { Router } from 'express';
import register from './controllers/register';
import logIn from './controllers/logIn';
import addNewList from './controllers/addNewList';
import removeList from './controllers/removeList';
import getUserData from './controllers/getUserData';

const router = Router();

router.get('/:username', getUserData)
router.post('/register', register);
router.post('/login', logIn);
router.post('/:username/lists', addNewList)
router.delete('/:username/lists/:listId', removeList)

export default router;
