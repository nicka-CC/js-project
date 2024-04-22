import { postService } from "../../services/postService/postService";
import counterSlice from "./CounterSlice/counterSlice";



const reducers = {
  counterReducer: counterSlice,

  [postService.reducerPath]: postService.reducer
}

export default reducers