/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from "../../../../type/global";
import { baseApi } from "../../api/baseApi";

const deliveryCharge = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDeliveryCharge: builder.mutation({
      query: (data) => ({
        url: "/deliveryCharge",
        method: "POST",
        body: data,
      }),
    }),

    getAllDeliveryCharge: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/deliveryCharge",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["DeliveryCharge"],
      transformResponse: (response: TResponseRedux<[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSingleDeliveryCharge: builder.query({
      query: (id) => {
        return {
          url: `/deliveryCharge/${id}`,
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

    updateDeliveryCharge: builder.mutation({
      query: (args) => ({
        url: `/deliveryCharge/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["DeliveryCharge"],
    }),

    deleteDeliveryCharge: builder.mutation({
      query: (id) => ({
        url: `/deliveryCharge/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeliveryCharge"],
    }),
  }),
});

export const {
  useGetAllDeliveryChargeQuery,
  useAddDeliveryChargeMutation,
  useUpdateDeliveryChargeMutation,
  useGetSingleDeliveryChargeQuery,
  useDeleteDeliveryChargeMutation,
} = deliveryCharge;
