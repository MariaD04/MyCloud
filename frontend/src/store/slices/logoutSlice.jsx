import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

const initialState = {
    loginInfo: [],
    saveLogin: '',
    loginLoading: false,
    refresh: '',
    access: '',
    userId: '',
    loginError: {}
}

export const loginSlice = createSliceWithThunk({
    name: 'login',
    initialState,
    selectors: {
        loginSelector: (state) => state.login
    },
    reducers: (create) => ({
        cleanInfo: create.reducer((state) => {
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

                } catch (e) {
                    return rejectWithValue(e)
                }
            },
            {
                pending: (state) => {
                    state.loginLoading = true
                    state.loginError = ''
                    state.loginInfo = []
                },
                fulfilled: (state, action) => {
                    state.loginInfo = action.payload
                    state.refresh = action.payload.refresh
                    state.access = action.payload.access
                },
                rejected: (state, action) => {
                    state.loginInfo = []
                    state.loginLoading = false
                    state.loginError = action.payload
                }
            }
        )
    })
})

export const { cleanInfo, saveLogin, saveUserId, fetchLogin } = loginSlice.actions
export const { loginSelector } = loginSlice.selectors
export default loginSlice.reducer