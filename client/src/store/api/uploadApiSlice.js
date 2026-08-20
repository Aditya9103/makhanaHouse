import { apiSlice } from './apiSlice';

export const uploadApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation({
            query: (data) => ({
                url: '/upload',
                method: 'POST',
                body: data,
            }),
        }),
        uploadVideo: builder.mutation({
            query: (data) => ({
                url: '/upload/video',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useUploadFileMutation, useUploadVideoMutation } = uploadApiSlice;
