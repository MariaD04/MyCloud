import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL

const initialState = {
    signupInfo: {},
    signupLoading: false,
    signupStatus: '',
    signupError: '',
    enterStatus: false,
    role: 'user'
}

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

export const signupSlice = createSliceWithThunk({
    name: 'signup',
    initialState,
    reducers: (create) => ({
        cleanSignupInfo: create.reducer((state, action) => {
            state.signupInfo = action.payload
        }),
        cleanSignupStatus: create.reducer((state, action) => {
            state.signupStatus = action.payload
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
                    };
                    const response = await axios.post(`${apiUrl}registration/`, data, config)
                    return response.data
                } catch (error) {
                    if (error.response) {
                        return rejectWithValue(error.response.data);
                    }
                    return rejectWithValue('Сетевая ошибка');
                }
            },
            {
                pending: (state) => {
                    state.signupInfo = {}
                    state.signupLoading = true
                    state.signupError = ''
                },
                fulfilled: (state, action) => {
                    state.signupInfo = action.payload
                    state.signupLoading = false;
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

export const { cleanSignupInfo, cleanSignupStatus, cleanSignupError, fetchSignup } = signupSlice.actions
export default signupSlice.reducer
