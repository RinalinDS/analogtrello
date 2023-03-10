import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BoardType } from '../../types/BoardsType'

export type BoardsReducerStateType = {
  boards: BoardType[]
  currentBoardId: number | null
  newBoardCreated: boolean
}

const initialState: BoardsReducerStateType = {
  boards: [],
  currentBoardId: null,
  newBoardCreated: false,
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
    toggleFlagNewBoard: (state, action: PayloadAction<boolean>) => {
      state.newBoardCreated = action.payload
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
  toggleFlagNewBoard,
} = slice.actions
