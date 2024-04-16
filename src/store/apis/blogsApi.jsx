import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const blogsApi = createApi({
    reducerPath: 'blogData',
    baseQuery: fetchBaseQuery({
       baseUrl: 'https://dummyjson.com/',
    }),
    endpoints(builder) {
        return {
            CreateComment: builder.mutation({
                query: ({id,name,body,imageUrl,userId}) => ({
                    url: '/comments/add',
                    method: 'POST',
                    body: JSON.stringify({
                        name: name,
                        imageUrl: imageUrl,
                        body: body,
                        postId: id,
                        userId: userId,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }),
            }),            
             
        };
    },
});

export const { useCreateCommentMutation } = blogsApi;
export default blogsApi;
