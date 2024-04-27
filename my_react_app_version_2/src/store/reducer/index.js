import { postService } from "../../services/postService/postService";
import { userService } from "../../services/userService/userService";
import counterSlice from "./CounterSlice/counterSlice";
import userSlice from "./userSlice/userSlice";

const reducers = {
  counterReducer: counterSlice,
  userReducer: userSlice,

  [postService.reducerPath]: postService.reducer,
  [userService.reducerPath]: userService.reducer,
};

export default reducers;
