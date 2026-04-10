import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../types'

export interface UserState {
    isAuthenticated: boolean
    user: User | null
}

const initialState: UserState = {
    isAuthenticated: false,
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
        },
    },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
