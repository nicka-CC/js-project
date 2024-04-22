import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const postService = createApi({
  reducerPath: 'postService',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (params) => ({
        url: `/posts`,
        method: 'GET',
        params: { ...params }
      }),
    }),
  }),
})

export const { useLazyGetPostsQuery, useGetPostsQuery } = postService
