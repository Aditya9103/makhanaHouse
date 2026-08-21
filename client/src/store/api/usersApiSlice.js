import { apiSlice } from './apiSlice';

const USERS_URL = '/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}`,
            }),
            providesTags: ['Users'],
        }),
        getCart: builder.query({
            query: () => ({
                url: `${USERS_URL}/profile/cart`,
            }),
            providesTags: ['Cart'],
        }),
        updateCart: builder.mutation({
            query: (cart) => ({
                url: `${USERS_URL}/profile/cart`,
                method: 'PUT',
                body: { cart },
            }),
            invalidatesTags: ['Cart'],
        }),
        getWishlist: builder.query({
            query: () => ({
                url: `${USERS_URL}/profile/wishlist`,
            }),
            providesTags: ['Wishlist'],
        }),
        toggleWishlist: builder.mutation({
            query: (productId) => ({
                url: `${USERS_URL}/profile/wishlist`,
                method: 'PUT',
                body: { productId },
            }),
            invalidatesTags: ['Wishlist'],
        }),
        getAddresses: builder.query({
            query: () => ({
                url: `${USERS_URL}/profile/addresses`,
            }),
            providesTags: ['Addresses'],
        }),
        updateAddresses: builder.mutation({
            query: (addresses) => ({
                url: `${USERS_URL}/profile/addresses`,
                method: 'PUT',
                body: { addresses },
            }),
            invalidatesTags: ['Addresses'],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetCartQuery,
    useUpdateCartMutation,
    useGetWishlistQuery,
    useToggleWishlistMutation,
    useGetAddressesQuery,
    useUpdateAddressesMutation,
} = usersApiSlice;
