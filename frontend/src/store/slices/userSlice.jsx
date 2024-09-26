import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_APP_API_URL

const initialState = {
    userInfo: {},
    userLoading: false,
    userError: ''
}

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

export const userSlice = createSliceWithThunk({
    name: 'user',
    initialState,
    reducers: (create) => ({
        cleanUserInfo: create.reducer((state) => {
            state.userInfo = {}
        }),
        fetchUser: create.asyncThunk(
            async (id, { rejectWithValue }) => {
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                    const response = await axios.get(`${apiUrl}users/${id}`, config)
                    return response.data
                } catch (error) {
                    console.log('Fetch error:', error);
                    return rejectWithValue(error.message);
                }
            },
            {
                pending: (state) => {
                    state.userInfo = {}
                    state.userLoading = true
                    state.userError = ''
                },
                fulfilled: (state, action) => {
                    state.userInfo = action.payload
                },
                rejected: (state, action) => {
                    state.userInfo = {}
                    state.loginError = action.payload
                },
                settled: (state) => {
                    state.userLoading = false
                }
            }
        )
    })
})

export const { cleanUserInfo, fetchUser } = userSlice.actions
export default userSlice.reducer



