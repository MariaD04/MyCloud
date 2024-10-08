import { configureStore, combineReducers } from "@reduxjs/toolkit"
import loginReducer from "../store/slices/loginSlice"
import signupReducer from "../store/slices/signupSlice"
import userReducer from "../store/slices/userSlice"
import usersReducer from "../store/slices/usersSlice"


const rootReducer = combineReducers({
    login: loginReducer,
    signup: signupReducer,
    user: userReducer,
    users: usersReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})