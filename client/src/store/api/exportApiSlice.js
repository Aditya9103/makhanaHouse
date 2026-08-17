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
        getExportInquiries: builder.query({
            query: () => ({
                url: '/export',
            }),
            providesTags: ['Export'],
        }),
        updateExportInquiryStatus: builder.mutation({
            query: ({ id, status, customMessage }) => ({
                url: `/export/${id}/status`,
                method: 'PUT',
                body: { status, customMessage },
            }),
            invalidatesTags: ['Export'],
        }),
    }),
});

export const { 
    useCreateExportInquiryMutation, 
    useGetMyExportInquiriesQuery,
    useGetExportInquiriesQuery,
    useUpdateExportInquiryStatusMutation
} = exportApiSlice;
