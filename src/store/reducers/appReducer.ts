import { createSlice } from '@reduxjs/toolkit'

import { MessageType } from '../../types/MessageType'

export type AppReducerStateType = {
  isLoading: boolean
  messages: MessageType[]
}
const initialState: AppReducerStateType = {
  isLoading: false,
  messages: [],
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    requestFinally: state => {
      state.isLoading = false
    },
    requestInitiated: state => {
      state.isLoading = true
    },
  },
})

export const appReducer = slice.reducer

export const { requestFinally, requestInitiated } = slice.actions
