/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from '../../../../type/global';
import { baseApi } from '../../api/baseApi';

const superAdmin = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    addSuperAdmin: builder.mutation({
      query: (data) => ({
        url: '/superAdmin',
        method: 'POST',
        body: data,
      }),
    }),

    getAllSuperAdmin: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/superAdmin',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['SuperAdmin'],
      transformResponse: (response: TResponseRedux<[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSingleSuperAdmin: builder.query({
      query: (id) => {
        return {
          url: `/superAdmin/${id}`,
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

    updateSuperAdmin: builder.mutation({
      query: (args) => ({
        url: `/superAdmin/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['SuperAdmin'],
    }),

    deleteSuperAdmin: builder.mutation({
      query: (id) => ({
        url: `/superAdmin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SuperAdmin'],
    }),


  }),
});

export const { 
  useGetAllSuperAdminQuery,
  useAddSuperAdminMutation,
  useUpdateSuperAdminMutation,
  useGetSingleSuperAdminQuery,
  useDeleteSuperAdminMutation
 } = superAdmin;