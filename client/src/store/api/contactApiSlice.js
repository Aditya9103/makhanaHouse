import { apiSlice } from './apiSlice';

const CONTACT_URL = '/contact';

export const contactApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        submitContactMessage: builder.mutation({
            query: (data) => ({
                url: CONTACT_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Contact'],
        }),
        getContactMessages: builder.query({
            query: () => ({
                url: CONTACT_URL,
            }),
            providesTags: ['Contact'],
        }),
        updateContactMessageStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `${CONTACT_URL}/${id}/status`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: ['Contact'],
        }),
        deleteContactMessage: builder.mutation({
            query: (id) => ({
                url: `${CONTACT_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contact'],
        }),
    }),
});

export const {
    useSubmitContactMessageMutation,
    useGetContactMessagesQuery,
    useUpdateContactMessageStatusMutation,
    useDeleteContactMessageMutation,
} = contactApiSlice;
