
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseURL = "https://auto.loanvantage360.com/internship/EvaluationSystemAngel";

const user = JSON.parse(sessionStorage.getItem("user") as string);

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery(({ baseUrl: baseURL,  headers: { Authorization: "Bearer " + user?.token }, })),
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
});