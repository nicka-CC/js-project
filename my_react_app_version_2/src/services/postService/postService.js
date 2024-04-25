import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postService = createApi({
  reducerPath: "postService",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3555" }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (body) => ({
        url: "/post/parse",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useLazyGetPostsQuery,
  useGetPostsQuery,
  useLazyGetAllPostsQuery,
  useGetAllPostsQuery,
} = postService;
