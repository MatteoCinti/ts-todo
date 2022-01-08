// import { addTodo, updateTodo } from '../../state/actions/todos.actions';
// import { addCategory } from '../../state/actions/categories.actions'
import { IUserNamePassword } from '../../state/user/user.interfaces'
import { userActions } from "../../state/user/user.slice";


// const dispatchAddTodo = (todoValue: string, dispatch: AppDispatch) => dispatch(addTodo(todoValue));
// const dispatchUpdateTodo = (todoValue: string, dispatch: AppDispatch) => dispatch(updateTodo(todoValue));
// const dispatchAddCategory = (newCategory: string, dispatch: AppDispatch) => dispatch(addCategory(newCategory))
const useDispatchSetNewUser = (payload: IUserNamePassword, dispatch: (arg0: { payload: IUserNamePassword; type: string; }) => void) => { dispatch(userActions.setNewUser(payload)); };


const utils = {
  // 'addTodo': dispatchAddTodo,
  // 'updateTodo': dispatchUpdateTodo,
  // 'addCategory': dispatchAddCategory,
  'setNewUser': useDispatchSetNewUser
};
export default utils;


