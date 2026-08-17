import { apiSlice } from './apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: '/auth/profile',
                method: 'PUT',
                body: data,
            }),
        }),
        adminLogin: builder.mutation({
            query: (data) => ({
                url: '/auth/admin/login',
                method: 'POST',
                body: data,
            }),
        }),
        adminRegister: builder.mutation({
            query: (data) => ({
                url: '/auth/admin/register',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useUpdateUserMutation, useAdminLoginMutation, useAdminRegisterMutation } = authApiSlice;
