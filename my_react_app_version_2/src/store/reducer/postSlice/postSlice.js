import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};
export const postSlice = createSlice({
  name: "postsReducer",
  initialState: initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload.posts;
    },
    resetPosts(state) {
      state.posts = [];
    },
  },
});

export const { setPosts, resetPosts } = postSlice.actions;
export default postSlice.reducer;
