import { configureStore, combineReducers } from "@reduxjs/toolkit"
import loginReducer from "../store/slices/loginSlice"
import userReducer from "../store/slices/userSlice"

const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})