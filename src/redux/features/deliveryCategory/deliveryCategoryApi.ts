/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from "../../../../type/global";
import { baseApi } from "../../api/baseApi";

const DeliveryCategory = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDeliveryCategory: builder.mutation({
      query: (data) => ({
        url: "/deliveryCategory",
        method: "POST",
        body: data,
      }),
    }),

    getAllDeliveryCategory: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/deliveryCategory",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["DeliveryCategory"],
      transformResponse: (response: TResponseRedux<[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSingleDeliveryCategory: builder.query({
      query: (id) => {
        return {
          url: `/deliveryCategory/${id}`,
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

    updateDeliveryCategory: builder.mutation({
      query: (args) => ({
        url: `/deliveryCategory/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["DeliveryCategory"],
    }),

    deleteDeliveryCategory: builder.mutation({
      query: (id) => ({
        url: `/deliveryCategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeliveryCategory"],
    }),
  }),
});

export const {
  useGetAllDeliveryCategoryQuery,
  useAddDeliveryCategoryMutation,
  useUpdateDeliveryCategoryMutation,
  useGetSingleDeliveryCategoryQuery,
  useDeleteDeliveryCategoryMutation,
} = DeliveryCategory;
