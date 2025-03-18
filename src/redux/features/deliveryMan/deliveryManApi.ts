import { TQueryParam, TResponseRedux } from "../../../../type/global";
import { baseApi } from "../../api/baseApi";
import { TDeliveryMan } from "./../../../../type/deliveryManType";

const deliveryMan = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDeliveryMan: builder.mutation({
      query: (data) => ({
        url: "/deliveryMan",
        method: "POST",
        body: data,
      }),
    }),

    getAllDeliveryMan: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/deliveryMan",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["DeliveryMan"],
      transformResponse: (response: TResponseRedux<TDeliveryMan[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSingleDeliveryMan: builder.query({
      query: (id) => {
        return {
          url: `/deliveryMan/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TDeliveryMan>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    updateDeliveryMan: builder.mutation({
      query: (args) => ({
        url: `/deliveryMan/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["DeliveryMan"],
    }),

    deleteDeliveryMan: builder.mutation({
      query: (id) => ({
        url: `/deliveryMan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeliveryMan"],
    }),
  }),
});

export const {
  useGetAllDeliveryManQuery,
  useAddDeliveryManMutation,
  useUpdateDeliveryManMutation,
  useGetSingleDeliveryManQuery,
  useDeleteDeliveryManMutation,
} = deliveryMan;
