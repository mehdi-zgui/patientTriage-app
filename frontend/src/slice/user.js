import { createSlice } from '@reduxjs/toolkit'
import { getUserFromStorage, saveUserToStorage, clearUserFromStorage } from '../utils/storage';

const userSlice = createSlice({
    name: 'user',
    initialState: { value: getUserFromStorage() },
    reducers: {
        addUser: (state, action) => {
            saveUserToStorage(action.payload);
        },
        deleteUser: (state, action) => {
            clearUserFromStorage()
        },
    },
})


export const { addUser, deleteUser } = userSlice.actions
export default userSlice.reducer