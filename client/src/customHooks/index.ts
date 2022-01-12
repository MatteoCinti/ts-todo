import { useParams } from "react-router-dom";
import { useAppSelector } from "../state/hooks";

export const useGetDBUsername = () => {
  const userState = useAppSelector(state => state.user);
  return useParams().username || userState.username;
}