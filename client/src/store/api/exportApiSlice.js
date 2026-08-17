import { apiSlice } from './apiSlice';

export const exportApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createExportInquiry: builder.mutation({
            query: (data) => ({
                url: '/export',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Export'],
        }),
        getMyExportInquiries: builder.query({
            query: () => ({
                url: '/export/myinquiries',
            }),
            providesTags: ['Export'],
        }),
    }),
});

export const { useCreateExportInquiryMutation, useGetMyExportInquiriesQuery } = exportApiSlice;
