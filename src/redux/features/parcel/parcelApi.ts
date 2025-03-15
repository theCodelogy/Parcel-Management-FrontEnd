/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from '../../../../type/global';
import { baseApi } from '../../api/baseApi';


const parcel = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    addParcel: builder.mutation({
      query: (data) => ({
        url: '/parcel',
        method: 'POST',
        body: data,
      }),
    }),

    getAllParcel: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/parcel',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['Parcel'],
      transformResponse: (response: TResponseRedux<[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSingleParcel: builder.query({
      query: (id) => {
        return {
          url: `/parcel/${id}`,
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

    updateParcel: builder.mutation({
      query: (args) => ({
        url: `/parcel/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['Parcel'],
    }),

    updateParcelStatus: builder.mutation({
      query: (args) => ({
        url: `/parcel/${args.id}`,
        method: 'PUT',
        body: args.data,
      }),
      invalidatesTags: ['Parcel'],
    }),

    deleteParcel: builder.mutation({
      query: (id) => ({
        url: `/parcel/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Parcel'],
    }),


  }),
});

export const { 
  useGetAllParcelQuery,
  useAddParcelMutation,
  useUpdateParcelMutation,
  useGetSingleParcelQuery,
  useDeleteParcelMutation,
  useUpdateParcelStatusMutation
 } = parcel;