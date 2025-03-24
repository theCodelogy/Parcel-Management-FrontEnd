import { TMerchant } from "./../../../../type/merchantType";
import { TQueryParam, TResponseRedux } from "./../../../../type/global";
import { baseApi } from "../../api/baseApi";

const merchant = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMerchant: builder.mutation({
      query: (data) => ({
        url: "/merchant",
        method: "POST",
        body: data,
      }),
    }),

    getAllMerchant: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/merchant",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Merchant"],
      transformResponse: (response: TResponseRedux<TMerchant[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSingleMerchant: builder.query({
      query: (id) => {
        return {
          url: `/merchant/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TMerchant>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    updateMerchant: builder.mutation({
      query: (args) => ({
        url: `/merchant/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["Merchant"],
    }),

    deleteMerchant: builder.mutation({
      query: (id) => ({
        url: `/merchant/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Merchant"],
    }),
  }),
});

export const {
  useGetAllMerchantQuery,
  useAddMerchantMutation,
  useUpdateMerchantMutation,
  useGetSingleMerchantQuery,
  useDeleteMerchantMutation,
} = merchant;