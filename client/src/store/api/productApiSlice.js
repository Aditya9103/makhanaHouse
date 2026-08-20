import { apiSlice } from './apiSlice';

const PRODUCTS_URL = '/products';

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProductFilters: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/filters`,
            }),
            keepUnusedDataFor: 5,
        }),
        getProducts: builder.query({
            query: (params) => ({
                url: PRODUCTS_URL,
                params: params,
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: (idOrSlug) => ({
                url: `${PRODUCTS_URL}/${idOrSlug}`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Product'],
        }),
        incrementProductView: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}/view`,
                method: 'PUT',
            }),
            invalidatesTags: ['Product'],
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: PRODUCTS_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        updateReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews/${data.reviewId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteReview: builder.mutation({
            query: ({ productId, reviewId }) => ({
                url: `${PRODUCTS_URL}/${productId}/reviews/${reviewId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        approveReview: builder.mutation({
            query: ({ productId, reviewId }) => ({
                url: `${PRODUCTS_URL}/${productId}/reviews/${reviewId}/approve`,
                method: 'PUT',
            }),
            invalidatesTags: ['Product'],
        }),
        getAllReviews: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/reviews/all`,
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5,
        }),
    }),
});

export const {
    useGetProductFiltersQuery,
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useApproveReviewMutation,
    useGetAllReviewsQuery,
    useIncrementProductViewMutation,
} = productApiSlice;
