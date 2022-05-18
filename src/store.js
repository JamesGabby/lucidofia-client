import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import userTokenReducer from './features/user/userTokenSlice'
import userNameReducer from './features/user/userNameSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        userToken: userTokenReducer,
        userName: userNameReducer
    },
})