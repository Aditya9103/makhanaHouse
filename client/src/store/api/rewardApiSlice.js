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
        updateOffer: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/rewards/offers/${id}`,
                method: 'PUT',
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
        validateOffer: builder.mutation({
            query: (data) => ({
                url: '/rewards/offers/validate',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetActiveOffersQuery,
    useGetAllOffersQuery,
    useCreateOfferMutation,
    useUpdateOfferMutation,
    useDeleteOfferMutation,
    useGetMyRewardHistoryQuery,
    useAssignPointsMutation,
    useValidateOfferMutation,
} = rewardApiSlice;
