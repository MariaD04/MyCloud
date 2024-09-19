import { configureStore, combineReducers } from "@reduxjs/toolkit"
import loginReducer from "../store/slices/loginSlice"
import userReducer from "../store/slices/userSlice"
import signupSlice from "./slices/signupSlice"

const rootReducer = combineReducers({
    login: loginReducer,
    signup: signupSlice,
    user: userReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})