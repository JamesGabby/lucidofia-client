import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import userTokenReducer from './features/user/userTokenSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        userToken: userTokenReducer
    },
})