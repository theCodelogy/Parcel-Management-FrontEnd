/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "type/global";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    getAllUser: builder.query({
      query: () => {
        return {
          url: "/auth/allUser",
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),

   getCurrentUser: builder.query({
        query: (args) => {
          const params = new URLSearchParams();
  
          if (args) {
            args.forEach((item: TQueryParam) => {
              params.append(item.name, item.value as string);
            });
          }
          return {
            url: '/auth/user',
            method: 'GET',
            params: params,
          };
        },
        transformResponse: (response: TResponseRedux<any>) => {
          return {
            data: response.data,
            meta: response.meta,
          };
        },
      }),

  }),
});

export const {
     useLoginMutation,
      useGetAllUserQuery,
      useGetCurrentUserQuery 
    } = authApi;
