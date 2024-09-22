import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL

const initialState = {
    fileInfo: [],
    fileData: '',
    openFile: '',
    deleteFileStatus: '',
    loginLoading: false,
    loginError: '',
}

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

export const loginSlice = createSliceWithThunk({
    name: 'disk',
    initialState,
    reducers: (create) => ({
        saveFileInfo: create.reducer((state, action) => {
            state.fileInfo = action.payload
        }),
        saveFileData: create.reducer((state, action) => {
            state.fileData = action.payload
        }),
        openFile: create.reducer((state, action) => {
            state.openFile = action.openFile
        }),
        deleteFileStatus: create.reducer((state, action) => {
            state.deleteFileStatus = action.openFile
        }),
        fetchDisk: create.asyncThunk(
            async (id, { rejectWithValue }) => {
                try {
                    const response = await axios.get(`${apiUrl}users/${id}/files/`)
                    return response.data
                } catch (error) {
                    if (error.response.status == 401) {
                        return rejectWithValue({ message: error.response.status })
                    }
                }
            },
            {
                pending: (state) => {
                    state.fileInfo = []
                    state.deleteFileStatus = ''
                    state.loginLoading = true
                    state.loginError = ''
                },
                fulfilled: (state, action) => {
                    state.fileInfo = action.payload
                },
                rejected: (state) => {
                    state.fileInfo = []
                    state.deleteFileStatus = ''
                },
                settled: (state) => {
                    state.loginLoading = false
                } 
            }
        )
    })
})

export const { saveFileInfo, saveFileData, openFile, deleteFileStatus, fetchDisk } = diskSlice.actions
export default diskSlice.reducer
