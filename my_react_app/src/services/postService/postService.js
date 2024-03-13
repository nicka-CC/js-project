import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const postService = createApi({
  reducerPath: 'postService',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (name) => `/posts`,
    }),
  }),
})

export const { useLazyGetPostsQuery, useGetPostsQuery } = postService

// export const postService = createApi({
//   reducerPath: 'postService',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
//   tagTypes: ['posts'],
//   endpoints: (builder) => ({
//     getPosts: builder.query({
//       query: (arg) => ({
//         url: '/posts',
//         method: 'GET',
//         // params: { limit: 5 }
//       }),
//       providesTags: ['posts']
//     })
//   })
// })

// export const {
//   useLazyGetPostsQuery,
//   useGetPostsQuery,


// } = postService;