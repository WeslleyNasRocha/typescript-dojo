import { combineReducers } from "@reduxjs/toolkit";
import PostReducer from "./posts";
import TodoReducer from "./todo";

const rootReducer = combineReducers({
  todo: TodoReducer,
  post: PostReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
