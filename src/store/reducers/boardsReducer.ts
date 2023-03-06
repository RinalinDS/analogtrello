import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BoardType } from '../../types/BoardsType'

export type BoardsReducerStateType = {
  boards: BoardType[]
  currentBoard: BoardType
}
const initialState: BoardsReducerStateType = {
  boards: [],
  currentBoard: {} as BoardType,
}

const slice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setCurrentBoard: (state, action: PayloadAction<{ id: number }>) => {
      state.currentBoard = state.boards.find(f => f.id === action.payload.id) as BoardType
    },
    fetchBoards: () => {},
    fetchBoardsFulfilled: (state, action: PayloadAction<BoardType[]>) => {
      state.boards = action.payload
    },
    addBoard: (_state, _action: PayloadAction<BoardType>) => {},
    addBoardFulfilled: (state, action: PayloadAction<BoardType>) => {
      state.boards.push(action.payload)
    },
    deleteBoard: (_state, _action: PayloadAction<{ id: number }>) => {},
    deleteBoardFulfilled: (state, action: PayloadAction<{ id: number }>) => {
      const index = state.boards.findIndex(f => f.id === action.payload.id)
      state.boards.splice(index, 1)
    },
  },
})

export const boardsReducer = slice.reducer

export const {
  fetchBoards,
  fetchBoardsFulfilled,
  addBoard,
  addBoardFulfilled,
  deleteBoardFulfilled,
  deleteBoard,
  setCurrentBoard,
} = slice.actions
