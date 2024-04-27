import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reducers from "./reducer";
import { userService } from "../services/userService/userService";
import { postService } from "../services/postService/postService";

console.log("🚀 ~ reducers:", reducers);

const rootReducer = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postService.middleware,
      userService.middleware
    ),
});
