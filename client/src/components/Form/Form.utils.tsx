// import { addTodo, updateTodo } from '../../state/actions/todos.actions';
// import { addCategory } from '../../state/actions/categories.actions'
import { userActions } from "../../state/reducers/user.slice";


// const dispatchAddTodo = (todoValue: string, dispatch: AppDispatch) => dispatch(addTodo(todoValue));
// const dispatchUpdateTodo = (todoValue: string, dispatch: AppDispatch) => dispatch(updateTodo(todoValue));
// const dispatchAddCategory = (newCategory: string, dispatch: AppDispatch) => dispatch(addCategory(newCategory))
const useDispatchSetUsername = (username: any, dispatch: (arg0: { payload: string; type: string; }) => void) => { dispatch(userActions.setUsername(username)); };


const utils = {
  // 'addTodo': dispatchAddTodo,
  // 'updateTodo': dispatchUpdateTodo,
  // 'addCategory': dispatchAddCategory,
  'setUsername': useDispatchSetUsername
};
export default utils;