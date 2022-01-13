export interface Map {
  [key: string]: string | undefined
};

export interface TextInputProps {
  type: string;
  name: string;
  innerText: string;
  cssClass: string;
  todoState?: [Map, React.Dispatch<React.SetStateAction<object>>];
};