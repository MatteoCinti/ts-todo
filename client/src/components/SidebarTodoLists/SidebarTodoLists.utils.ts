export const handleMinimizeClick = ( 
  setMinimize: React.Dispatch<React.SetStateAction<boolean>>,
  boolean: boolean
) => setMinimize(minimized => !minimized);