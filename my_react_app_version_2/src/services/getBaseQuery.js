import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3555",
    prepareHeaders: (header, api) => {
      let token = localStorage.getItem("token");

      token && header.set("Authorization", `Bearer ${token}`);
      return header;
    },
  });
