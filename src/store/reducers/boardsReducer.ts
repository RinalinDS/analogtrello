import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BoardType } from '../../types/BoardsType'

export type BoardsReducerStateType = {
  boards: BoardType[]
  currentBoardId: number | null
  isNewBoardCreated: boolean
}

const initialState: BoardsReducerStateType = {
  boards: [],
  currentBoardId: null,
  isNewBoardCreated: false,
}

const slice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setCurrentBoardId: (state, action: PayloadAction<number | null>) => {
      state.currentBoardId = action.payload
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
    toggleIsNewBoardCreated: (state, action: PayloadAction<boolean>) => {
      state.isNewBoardCreated = action.payload
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
  toggleIsNewBoardCreated,
} = slice.actions
