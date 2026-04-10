import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Post, PostType, PostDirection } from '../../types'

interface PostsState {
    items: Post[]
    total: number
    page: number
    pageSize: number
    loading: boolean
    error: string | null
    filterType: PostType | null
    filterDirection: PostDirection | null
}

const initialState: PostsState = {
    items: [],
    total: 0,
    page: 1,
    pageSize: 10,
    loading: false,
    error: null,
    filterType: null,
    filterDirection: null,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action: PayloadAction<{ posts: Post[]; total: number }>) {
            state.items = action.payload.posts
            state.total = action.payload.total
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        setFilterType(state, action: PayloadAction<PostType | null>) {
            state.filterType = action.payload
            state.page = 1
        },
        setFilterDirection(state, action: PayloadAction<PostDirection | null>) {
            state.filterDirection = action.payload
            state.page = 1
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        },
    },
})

export const {
    setPosts,
    setPage,
    setFilterType,
    setFilterDirection,
    setLoading,
    setError,
} = postsSlice.actions
export default postsSlice.reducer
