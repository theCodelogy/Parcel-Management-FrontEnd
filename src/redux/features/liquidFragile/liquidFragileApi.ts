/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from '../../../../type/global';
import { baseApi } from '../../api/baseApi';


const LiquidFragile = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    addLiquidFragile: builder.mutation({
      query: (data) => ({
        url: '/liquidFragile',
        method: 'POST',
        body: data,
      }),
    }),

    getAllLiquidFragile: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/liquidFragile',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['LiquidFragile'],
      transformResponse: (response: TResponseRedux<[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSingleLiquidFragile: builder.query({
      query: (id) => {
        return {
          url: `/liquidFragile/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    updateLiquidFragile: builder.mutation({
      query: (args) => ({
        url: `/liquidFragile/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['LiquidFragile'],
    }),

    deleteLiquidFragile: builder.mutation({
      query: (id) => ({
        url: `/liquidFragile/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['LiquidFragile'],
    }),


  }),
});

export const { 
  useGetAllLiquidFragileQuery,
  useAddLiquidFragileMutation,
  useUpdateLiquidFragileMutation,
  useGetSingleLiquidFragileQuery,
  useDeleteLiquidFragileMutation
 } =LiquidFragile;