import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  name: 'boards',
  initialState,
  reducers: {
    addErrorMsg: (state, action: PayloadAction<string>) => {
      const message: MessageType = {
        id: new Date().toISOString(),
        severity: 'error',
        message: action.payload,
      }
      state.messages.push(message)
    },
    addSuccessMsg: (state, action: PayloadAction<string>) => {
      const message: MessageType = {
        id: new Date().toISOString(),
        severity: 'success',
        message: action.payload,
      }
      state.messages.push(message)
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      const index = state.messages.findIndex(f => f.id === action.payload)
      state.messages.splice(index, 1)
    },
    requestFinally: state => {
      state.isLoading = false
    },
    requestInitiated: state => {
      state.isLoading = true
    },
  },
})

export const appReducer = slice.reducer

export const { addErrorMsg, addSuccessMsg, requestFinally, requestInitiated, removeMessage } =
  slice.actions
