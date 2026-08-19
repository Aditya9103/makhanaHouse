import { apiSlice } from "./apiSlice";
const CONFIG_URL = '/config';

export const configApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStoreConfig: builder.query({
            query: () => ({
                url: CONFIG_URL,
            }),
            providesTags: ['Config']
        }),
        updateStoreConfig: builder.mutation({
            query: (data) => ({
                url: CONFIG_URL,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Config']
        }),
    }),
});

export const { useGetStoreConfigQuery, useUpdateStoreConfigMutation } = configApiSlice;
