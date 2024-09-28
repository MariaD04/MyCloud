import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL

const initialState = {
    loginLoading: false,
    loginStatus: '',
    loginError: '',
    saveLogin: '',
    role: 'user'
}

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

export const logoutSlice = createSliceWithThunk({
    name: 'logout',
    initialState,
    reducers: (create) => ({
        fetchLogout: create.asyncThunk(
            async () => {
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    };
                    await axios.post(`${apiUrl}logout/`, {
                        refresh_token: localStorage.getItem('refresh_token')
                    }, config)
                    axios.defaults.headers.common['Authorization'] = null
                } catch (error) {
                    console.log(error)
                }
            },
            {
                pending: (state) => {
                    state.loginLoading = true
                    state.loginError = ''
                },
                fulfilled: (state, action) => {
                    state.loginLoading = false;
                },
                rejected: (state, action) => {
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

export const { fetchLogout } = logoutSlice.actions
export default logoutSlice.reducer
