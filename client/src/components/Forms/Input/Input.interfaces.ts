export interface Map {
  [key: string]: string | undefined
};

export interface InputProps {
  type: string;
  name: string;
  innerText: string;
  cssClass: string;
  todoState?: [Map, React.Dispatch<React.SetStateAction<object>>];
};