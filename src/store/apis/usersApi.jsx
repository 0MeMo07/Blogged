import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const token = JSON.parse(sessionStorage.getItem('Authorization'))?.token;

const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
       baseUrl: 'https://dummyjson.com/',
    }),
    endpoints(builder) {
        return {
            fetchUsers: builder.query({
                query: () => ({
                    url: '/users', 
                    method: 'GET',
                }),
            }),
            getAuthToken: builder.query({
                query: () => ({
                    url:'/auth/me',
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    }, 
                })
            }),
            AuthTokenVerification: builder.mutation({
                query: ({username, password}) => ({
                    url:'/auth/login',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: {
                      username: username,
                      password: password,
                    }
                })
            }),
            
            
        };
    },
});

export const { useFetchUsersQuery, useGetAuthTokenQuery, useAuthTokenVerificationMutation } = usersApi;
export default usersApi;
