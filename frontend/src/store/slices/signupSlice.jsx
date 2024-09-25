import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL

const initialState = {
    signupInfo: {},
    signupLoading: false,
    signupError: {},
    role: 'user'
}

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

export const loginSlice = createSliceWithThunk({
    name: 'signup',
    initialState,
    reducers: (create) => ({
        cleanSignupInfo: create.reducer((state, action) => {
            state.signupInfo = action.payload
        }),
        cleanSignupError: create.reducer((state, action) => {
            state.signupError = action.payload
        }),
        fetchSignup: create.asyncThunk(
            async (data, { rejectWithValue }) => {
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                    const response = await axios.post(`${apiUrl}registration/`, data, config)
                    return response.data
                } catch (error) {
                    if (error.response.status == 401) {
                        return rejectWithValue({ message: error.response.status })
                    }
                }
            },
            {
                pending: (state) => {
                    state.signupInfo = {}
                    state.signupLoading = true
                    state.signupError = {}
                },
                fulfilled: (state, action) => {
                    state.signupInfo = action.payload
                },
                rejected: (state, action) => {
                    state.signupLoading = false
                    state.signupError = action.payload
                },
                settled: (state) => {
                    state.signupLoading = false
                } 
            }
        )
    })
})

export const { cleanSignupInfo, cleanSignupError, fetchSignup } = signupSlice.actions
export default signupSlice.reducer
