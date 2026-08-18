import { apiSlice } from './apiSlice';

export const newsletterApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        subscribeNewsletter: builder.mutation({
            query: (data) => ({
                url: '/newsletter',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Newsletter'],
        }),
        getSubscribers: builder.query({
            query: () => ({
                url: '/newsletter',
            }),
            providesTags: ['Newsletter'],
        }),
        updateSubscriberStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/newsletter/${id}/status`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: ['Newsletter'],
        }),
        deleteSubscriber: builder.mutation({
            query: (id) => ({
                url: `/newsletter/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Newsletter'],
        }),
    }),
});

export const {
    useSubscribeNewsletterMutation,
    useGetSubscribersQuery,
    useUpdateSubscriberStatusMutation,
    useDeleteSubscriberMutation,
} = newsletterApiSlice;
