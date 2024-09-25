import { configureStore, combineReducers } from "@reduxjs/toolkit"
import loginReducer from "../store/slices/loginSlice"
import signupReducer from "../store/slices/signupSlice"
import userReducer from "../store/slices/userSlice"


const rootReducer = combineReducers({
    login: loginReducer,
    signup: signupReducer,
    user: userReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})