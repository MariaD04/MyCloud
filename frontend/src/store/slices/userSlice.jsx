import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_APP_API_URL

const initialState = {
    userInfo: {},
    userStatus: '',
    saveLogin: '',
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
                    const response = await fetch(`${apiUrl}users/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include'
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.log('Fetch error:', error);
                    return rejectWithValue(error.message);
                }
            },
            {
                pending: (state) => {
                    state.userLoading = true
                    state.userError = ''
                    state.userInfo = {}
                },
                fulfilled: (state, action) => {
                    state.userInfo = action.payload
                },
                rejected: (state, action) => {
                    state.userInfo = {}
                    state.loginError = action.payload
                }
            }
        )
    })
})

export const { cleanUserInfo, fetchUser } = userSlice.actions
export default userSlice.reducer



