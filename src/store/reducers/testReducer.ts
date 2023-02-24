import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PostType } from '../../types/PostType'

export type TestReducerStateType = {
  isLoading: boolean
  error: null | string
  posts: PostType[]
}
const initialState: TestReducerStateType = {
  isLoading: false,
  error: null,
  posts: [],
}

export type fetchPostsPayloadAction = {
  id: number
}

const slice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    fetchPosts: (state, action) => {
      state.isLoading = true
    },
    fetchPostFulfilled: (state, action: PayloadAction<PostType>) => {
      state.posts.push(action.payload)
    },
    fetchPostsReject: (state, action) => {
      state.error = action.payload
    },
    fetchPostsFinally: state => {
      state.isLoading = false
    },
  },
})

export const testReducer = slice.reducer

export const { fetchPosts, fetchPostFulfilled, fetchPostsReject, fetchPostsFinally } = slice.actions
