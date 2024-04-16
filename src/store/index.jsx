import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import usersApi from "./apis/usersApi"; 
import blogsApi from "./apis/blogsApi"; 
import userReducer from "./slices/userData"; 
import blogReducer from "./slices/blogData";

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [blogsApi.reducerPath]: blogsApi.reducer,
        userData: userReducer,
        blogData: blogReducer, 
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(usersApi.middleware, blogsApi.middleware)
    }
})


setupListeners(store.dispatch)

export {
    useFetchUsersQuery,
    useGetAuthTokenQuery,
    useAuthTokenVerificationMutation,
} from './apis/usersApi'


export {
    useCreateCommentMutation
} from './apis/blogsApi'