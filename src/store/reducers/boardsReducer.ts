import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BoardType } from '../../types/BoardsType'

export type BoardsReducerStateType = {
  boards: BoardType[]
  currentBoardId: number | null
}
const initialState: BoardsReducerStateType = {
  boards: [],
  currentBoardId: null,
}

const slice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setCurrentBoardId: (state, action: PayloadAction<{ id: number }>) => {
      state.currentBoardId = action.payload.id
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
  setCurrentBoardId,
} = slice.actions
