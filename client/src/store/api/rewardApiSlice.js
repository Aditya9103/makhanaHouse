import { apiSlice } from './apiSlice';

export const rewardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getActiveOffers: builder.query({
            query: () => '/rewards/offers',
            providesTags: ['Offer'],
        }),
        getAllOffers: builder.query({
            query: () => '/rewards/offers/admin',
            providesTags: ['Offer'],
        }),
        createOffer: builder.mutation({
            query: (data) => ({
                url: '/rewards/offers',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Offer'],
        }),
        deleteOffer: builder.mutation({
            query: (id) => ({
                url: `/rewards/offers/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Offer'],
        }),
        getMyRewardHistory: builder.query({
            query: () => '/rewards/history',
            providesTags: ['RewardHistory'],
        }),
        assignPoints: builder.mutation({
            query: (data) => ({
                url: '/rewards/assign',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['RewardHistory', 'User'],
        }),
    }),
});

export const {
    useGetActiveOffersQuery,
    useGetAllOffersQuery,
    useCreateOfferMutation,
    useDeleteOfferMutation,
    useGetMyRewardHistoryQuery,
    useAssignPointsMutation,
} = rewardApiSlice;
