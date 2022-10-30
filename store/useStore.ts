import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import type { StoreState, StoreDispatch } from "./store";

export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export const useAppDispatch: () => StoreDispatch = useDispatch;
