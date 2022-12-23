import { addNoti } from "../store/slice/notiSlice";
import { useAppDispatch } from "./useStore";

export default function useNotification() {
  const dispatch = useAppDispatch();
  const addNotification = (
    message: string,
    variant: "normal" | "error" | "success" = "normal"
  ) => {
    dispatch(addNoti({ id: Date.now(), message, variant }));
  };

  return addNotification;
}
