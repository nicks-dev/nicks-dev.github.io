import {configureStore} from "@reduxjs/toolkit";
import {
    TypedUseSelectorHook,
    useDispatch as d,
    useSelector as s,
} from "react-redux";
import reducer from "./reducers/root";
import {State} from "../types";

const store = configureStore<State>({
    reducer,
});

export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => d<typeof store.dispatch>();
export const useSelector: TypedUseSelectorHook<State> = s;
export default store;
