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
  if (!serializedState || serializedState === '{}') return undefined;
  return JSON.parse(serializedState);
}

export const partitionArray = (
  array: any[], 
  filter: (
    arg0: any, 
    arg1: number, 
    arg2: any[]
  ) => any
): [any[], any[]] => {
  let pass: any[] = [], fail: any[] = [];
  array.forEach((e, idx, arr) => (filter(e, idx, arr) ? pass : fail).push(e));
  return [pass, fail];
}