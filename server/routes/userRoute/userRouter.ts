import { Router } from 'express';
import register from './controllers/register';
import logIn from './controllers/logIn';
import addNewList from './controllers/addNewList';
import removeList from './controllers/removeList';
import getUserData from './controllers/getUserData';
import updateTodoLists from './controllers/updateTodoLists';
import addTodoObject from './controllers/addTodoObject';

const router = Router();

router.post('/register', register);
router.post('/login', logIn);
router.get('/:username', getUserData);
router.post('/:username/lists', addNewList);
router.put('/:username/lists', updateTodoLists);
router.delete('/:username/lists/:listId', removeList);
router.post('/:username/lists/:listId', addTodoObject);

export default router;
