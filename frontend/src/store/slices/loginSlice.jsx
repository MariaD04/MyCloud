import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL

const initialState = {
    loginInfo: {},
    loginLoading: false,
    loginError: {},
    saveLogin: '',
    access: '',
    refresh: '',
    userId: '',
}

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

export const loginSlice = createSliceWithThunk({
    name: 'login',
    initialState,
    reducers: (create) => ({
        cleanLoginInfo: create.reducer((state) => {
            state.loginInfo = {}
        }),
        saveLogin: create.reducer((state, action) => {
            state.saveLogin = action.payload
        }),
        saveUserId: create.reducer((state, action) => {
            state.userId = action.payload
        }),
        fetchLogin: create.asyncThunk(
            async (user, { rejectWithValue }) => {
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                    const response = await axios.post(`${apiUrl}token/`, user, config)
                    return response.data
                } catch (error) {
                    if (error.response.status == 401) {
                        return rejectWithValue({ message: error.response.status })
                    }
                }
            },
            {
                pending: (state) => {
                    state.loginInfo = {}
                    state.loginLoading = true
                    state.loginError = {}
                },
                fulfilled: (state, action) => {
                    state.loginInfo = action.payload
                    state.access = action.payload.access
                    state.refresh = action.payload.refresh
                },
                rejected: (state, action) => {
                    state.loginInfo = {}
                    state.loginLoading = false
                    state.loginError = action.payload
                },
                settled: (state) => {
                    state.loginLoading = false
                } 
            }
        )
    })
})

export const { cleanLoginInfo, saveLogin, saveUserId, fetchLogin } = loginSlice.actions
export default loginSlice.reducer
