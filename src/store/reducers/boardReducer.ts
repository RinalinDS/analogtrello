import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type BoardType = {
  id: number
  title: string
}
export type BoardStateType = BoardType[]

const initialState: BoardStateType = []

const slice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoardFulFilled: (state, action: PayloadAction<BoardType>) => {
      state.push(action.payload)
    },
  },
})

export const boardReducer = slice.reducer
export const { addBoardFulFilled } = slice.actions
