/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from "../../../../type/global";
import { baseApi } from "../../api/baseApi";

const walletRequest = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addWalletRequest: builder.mutation({
      query: (data) => ({
        url: "/walletRequest",
        method: "POST",
        body: data,
      }),
    }),

    getAllWalletRequests: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/walletRequest",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["WalletRequest"],
      transformResponse: (response: TResponseRedux<[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSingleWalletRequest: builder.query({
      query: (id) => {
        return {
          url: `/walletRequest/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    updateWalletRequest: builder.mutation({
      query: (args) => ({
        url: `/walletRequest/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["WalletRequest"],
    }),

    deleteWalletRequest: builder.mutation({
      query: (id) => ({
        url: `/walletRequest/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WalletRequest"],
    }),
  }),
});

export const {
  useGetAllWalletRequestsQuery,
  useAddWalletRequestMutation,
  useUpdateWalletRequestMutation,
  useGetSingleWalletRequestQuery,
  useDeleteWalletRequestMutation,
} = walletRequest;
