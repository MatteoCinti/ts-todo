import { useParams } from "react-router-dom";
import { useAppSelector } from "../state/hooks";

export const useGetOperationsUsername = () => {
  const ownerUsername = useAppSelector(state => state.socket.owner);
  return ownerUsername || useParams().username
}