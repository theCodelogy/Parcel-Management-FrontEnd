import { baseApi } from '../../api/baseApi';

const merchant = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMerchant: builder.query({
      query: () => ({
        url: '/merchant',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllMerchantQuery } = merchant;