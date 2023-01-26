import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface UserState {
    isLoggedIn: boolean;
}

const initialState: UserState = {
    isLoggedIn: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
    },
})

export const {changeIsLoggedIn,} = userSlice.actions

export default userSlice.reducer