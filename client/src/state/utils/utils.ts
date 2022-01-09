import { ISingleList, ITodoLists } from "../todoLists/todoLists.interfaces";

export const saveToLocalStorage = (key: string, payload: ITodoLists) => {
  const persistedState = JSON.parse(localStorage.getItem('justDoItState') || '{}');    
  const localStorageState = {
    ...persistedState,
    [key]: payload
  }
  console.log(payload)
  localStorage.setItem("justDoItState", JSON.stringify(localStorageState));
}

export const getPersistedState = () => {
  const serializedState = localStorage.getItem('justDoItState');
  if (!serializedState || serializedState === '{}') return undefined;
  return JSON.parse(serializedState);
}