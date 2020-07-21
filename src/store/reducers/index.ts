import { combineReducers } from "@reduxjs/toolkit";
import Post from "./post";
import Todos from "./todo";

const rootReducer = combineReducers({
  Todos,
  Post,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
