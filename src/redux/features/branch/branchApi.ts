/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from "../../../../type/global";
import { baseApi } from "../../api/baseApi";

const Branch = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBranch: builder.mutation({
      query: (data) => ({
        url: "/branch",
        method: "POST",
        body: data,
      }),
    }),

    getAllBranch: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/branch",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Branch"],
      transformResponse: (response: TResponseRedux<[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSingleBranch: builder.query({
      query: (id) => {
        return {
          url: `/branch/${id}`,
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

    updateBranch: builder.mutation({
      query: (args) => ({
        url: `/branch/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["Branch"],
    }),

    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `/branch/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Branch"],
    }),
  }),
});

export const {
  useGetAllBranchQuery,
  useAddBranchMutation,
  useUpdateBranchMutation,
  useGetSingleBranchQuery,
  useDeleteBranchMutation,
} = Branch;