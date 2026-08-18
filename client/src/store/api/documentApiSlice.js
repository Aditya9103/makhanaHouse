import { apiSlice } from './apiSlice';

export const documentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDocuments: builder.query({
            query: () => ({
                url: '/documents',
            }),
            providesTags: ['Document'],
        }),
        addDocument: builder.mutation({
            query: (data) => ({
                url: '/documents',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Document'],
        }),
        deleteDocument: builder.mutation({
            query: (id) => ({
                url: `/documents/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Document'],
        }),
    }),
});

export const {
    useGetDocumentsQuery,
    useAddDocumentMutation,
    useDeleteDocumentMutation,
} = documentApiSlice;
