import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BoardType, CardType, TaskType } from '../../types/BoardsType'

export type BoardsReducerStateType = {
  isLoading: boolean
  error: null | string
  boards: BoardType[]
  cards: CardType[]
  tasks: {
    [key: number]: TaskType[]
  }
}
const initialState: BoardsReducerStateType = {
  isLoading: false,
  error: null,
  boards: [],
  cards: [],
  tasks: {},
}

const slice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    requestReject: (state, action) => {
      state.error = action.payload
    },
    requestFinally: state => {
      state.isLoading = false
    },
    fetchBoards: state => {
      state.isLoading = true
    },
    fetchBoardsFulfilled: (state, action: PayloadAction<BoardType[]>) => {
      state.boards = action.payload
    },
    // fetchBoardsReject: (state, action) => {
    //   state.error = action.payload
    // },
    // fetchBoardsFinally: state => {
    //   state.isLoading = false
    // },
    addBoard: (state, _action: PayloadAction<BoardType>) => {
      state.isLoading = true
    },
    addBoardFulfilled: (state, action: PayloadAction<BoardType>) => {
      state.boards.push(action.payload)
    },
    // addBoardReject: (state, action) => {
    //   state.error = action.payload
    // },
    // addBoardFinally: state => {
    //   state.isLoading = false
    // },
    fetchCards: (state, _action: PayloadAction<{ id: number }>) => {
      state.isLoading = true
    },
    fetchCardsFulfilled: (state, action: PayloadAction<CardType[]>) => {
      state.cards = action.payload
    },
    addCard: (state, _action: PayloadAction<Partial<CardType>>) => {
      state.isLoading = true
    },
    addCardFulfilled: (state, action: PayloadAction<CardType>) => {
      state.cards.push(action.payload)
    },
    fetchTasks: (state, _action: PayloadAction<{ id: number }>) => {
      state.isLoading = true
    },
    fetchTasksFulfilled: (state, action: PayloadAction<{ id: number; tasks: TaskType[] }>) => {
      state.tasks[action.payload.id] = action.payload.tasks
    },
    addTask: (state, _action: PayloadAction<TaskType>) => {
      state.isLoading = true
    },
    addTaskFulfilled: (state, action: PayloadAction<TaskType>) => {
      state.tasks[action.payload.cardId].push(action.payload)
    },
  },
})

export const boardsReducer = slice.reducer

export const {
  requestReject,
  requestFinally,
  fetchBoards,
  fetchBoardsFulfilled,
  addBoard,
  addBoardFulfilled,
  fetchCards,
  fetchCardsFulfilled,
  addCard,
  addCardFulfilled,
  fetchTasks,
  fetchTasksFulfilled,
  addTask,
  addTaskFulfilled,
} = slice.actions
