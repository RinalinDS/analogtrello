import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BoardType } from '../../types/BoardsType'

export type BoardsReducerStateType = {
  boards: BoardType[]
}
const initialState: BoardsReducerStateType = {
  boards: [],
}

const slice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    fetchBoards: () => {},
    fetchBoardsFulfilled: (state, action: PayloadAction<BoardType[]>) => {
      state.boards = action.payload
    },
    addBoard: (_state, _action: PayloadAction<BoardType>) => {},
    addBoardFulfilled: (state, action: PayloadAction<BoardType>) => {
      state.boards.push(action.payload)
    },
  },
})

export const boardsReducer = slice.reducer

export const { fetchBoards, fetchBoardsFulfilled, addBoard, addBoardFulfilled } = slice.actions
