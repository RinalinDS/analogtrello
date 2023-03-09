import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { MessageType } from '../../types/MessageType'

export type AppReducerStateType = {
  isLoading: boolean
  messages: MessageType[]
  theme: {
    background: string
    color: string
  }
}
const initialState: AppReducerStateType = {
  isLoading: false,
  messages: [],
  theme: {
    background: '',
    color: '',
  },
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
    setTheme: (state, action: PayloadAction<{ background: string }>) => {
      state.theme.background = action.payload.background
    },
  },
})

export const appReducer = slice.reducer

export const { requestFinally, requestInitiated, setTheme } = slice.actions
