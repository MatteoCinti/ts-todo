const handleMinimizeClick = (
  setMinimize: React.Dispatch<React.SetStateAction<boolean>>,
) => setMinimize((minimized) => !minimized);

export default handleMinimizeClick;
