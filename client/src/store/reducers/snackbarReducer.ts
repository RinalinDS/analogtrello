import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { MessageType } from '../../types/MessageType'

export type SnackbarStateType = {
  messages: MessageType[]
}
const initialState: SnackbarStateType = {
  messages: [],
}

const slice = createSlice({
  name: 'snackbar',
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
  },
})

export const snackbarReducer = slice.reducer

export const { addErrorMsg, addSuccessMsg, removeMessage } = slice.actions
