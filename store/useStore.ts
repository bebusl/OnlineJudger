import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import type { StoreState, StoreDispatch } from "./store";

export const useAuthSelector: TypedUseSelectorHook<StoreState> = useSelector;

export const useAuthDispatch: () => StoreDispatch = useDispatch;
