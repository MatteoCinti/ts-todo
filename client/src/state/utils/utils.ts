import { ISingleList, ITodoLists } from "../todoLists/todoLists.interfaces";

export const saveToLocalStorage = (key: string, payload: ITodoLists) => {
  const persistedState = JSON.parse(localStorage.getItem('justDoItState') || '{}');    
  const localStorageState = {
    ...persistedState,
    [key]: payload
  }
  localStorage.setItem("justDoItState", JSON.stringify(localStorageState));
}

export const getPersistedState = () => {
  const serializedState = localStorage.getItem('justDoItState');
  console.log("🚀 ~ file: utils.ts ~ line 14 ~ getPersistedState ~ serializedState", serializedState)
  if (!serializedState || serializedState === '{}') return undefined;
  return JSON.parse(serializedState);
}