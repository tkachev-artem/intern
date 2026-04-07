import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { z } from 'zod'

// Zod схема
export const UserSchema = z.object({
    id: z.string(),
    nickname: z.string(),
    role: z.enum([
        'Frontend Developer',
        'Backend Developer',
        'QA Engineer',
        'Designer',
        'Manager',
        'HR',
    ]),
    token: z.string(),
})

// Тип из схемы
export type User = z.infer<typeof UserSchema>

interface UserState {
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