/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from "../../../../type/global";
import { baseApi } from "../../api/baseApi";

const Packaging = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPackaging: builder.mutation({
      query: (data) => ({
        url: "/packaging",
        method: "POST",
        body: data,
      }),
    }),

    getAllPackaging: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/packaging",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Packaging"],
      transformResponse: (response: TResponseRedux<[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSinglePackaging: builder.query({
      query: (id) => ({
        url: `/packaging/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    updatePackaging: builder.mutation({
      query: (args) => ({
        url: `/packaging/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["Packaging"],
    }),

    deletePackaging: builder.mutation({
      query: (id) => ({
        url: `/packaging/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Packaging"],
    }),
  }),
});

export const {
  useGetAllPackagingQuery,
  useAddPackagingMutation,
  useUpdatePackagingMutation,
  useGetSinglePackagingQuery,
  useDeletePackagingMutation,
} = Packaging;
