import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_APP_API_URL

const initialState = {
    usersInfo: {},
    usersLoading: false,
    usersError: '',
    deleteUser: ''
}

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

export const usersSlice = createSliceWithThunk({
    name: 'users',
    initialState,
    reducers: (create) => ({
        deleteUserStatus: create.reducer((state, action) => {
            state.deleteUser = action.payload
        }),
        fetchUsers: create.asyncThunk(
            async () => {
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                    const response = await axios.get(`${apiUrl}users/`, config)
                    return response.data
                } catch (error) {
                    console.log('Fetch error:', error);
                }
            },
            {
                pending: (state) => {
                    state.usersInfo = {}
                    state.usersLoading = true
                    state.usersError = ''
                    state.deleteUser = ''
                },
                fulfilled: (state, action) => {
                    state.usersInfo = action.payload
                    state.usersLoading = false
                },
                rejected: (state, action) => {
                    state.usersInfo = {}
                    state.loginError = action.payload
                    state.deleteUser = ''
                },
                settled: (state) => {
                    state.usersLoading = false
                }
            }
        )
    })
})

export const { deleteUserStatus, fetchUsers } = usersSlice.actions
export default usersSlice.reducer



