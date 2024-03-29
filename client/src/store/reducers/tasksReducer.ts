import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  ChangeDescriptionPayloadType,
  ChangeTaskTitlePayloadType,
  DeleteTaskPayloadType,
  TaskType,
} from '../../types/BoardsType'

import { deleteCardFulfilled } from './cardsReducer'

export type TasksReducerStateType = {
  tasks: {
    [key: number]: TaskType[]
  }
}
const initialState: TasksReducerStateType = {
  tasks: {},
}

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasks: (_state, _action: PayloadAction<{ id: number }>) => {},
    fetchTasksFulfilled: (state, action: PayloadAction<{ id: number; tasks: TaskType[] }>) => {
      state.tasks[action.payload.id] = action.payload.tasks
    },
    addTask: (_state, _action: PayloadAction<TaskType>) => {},
    addTaskFulfilled: (state, action: PayloadAction<TaskType>) => {
      state.tasks[action.payload.cardId].push(action.payload)
    },
    deleteTask: (_state, _action: PayloadAction<DeleteTaskPayloadType>) => {},
    deleteTaskFulfilled: (state, action: PayloadAction<DeleteTaskPayloadType>) => {
      const index = state.tasks[action.payload.cardId].findIndex(f => f.id === action.payload.id)
      state.tasks[action.payload.cardId].splice(index, 1)
    },
    changeTaskTitle: (_state, _action: PayloadAction<ChangeTaskTitlePayloadType>) => {},
    changeTaskTitleFulfilled: (state, action: PayloadAction<TaskType>) => {
      if (action.payload.cardId) {
        const index = state.tasks[action.payload.cardId].findIndex(f => f.id === action.payload.id)
        state.tasks[action.payload.cardId][index] = action.payload
      }
    },
    changeTaskDescription: (_state, _action: PayloadAction<ChangeDescriptionPayloadType>) => {},
    changeTaskDescriptionFulfilled: (state, action: PayloadAction<TaskType>) => {
      if (action.payload.cardId) {
        const index = state.tasks[action.payload.cardId].findIndex(f => f.id === action.payload.id)
        state.tasks[action.payload.cardId][index] = action.payload
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(deleteCardFulfilled, (state, action) => {
      delete state.tasks[action.payload.id]
    })
  },
})

export const tasksReducer = slice.reducer

export const {
  fetchTasks,
  fetchTasksFulfilled,
  addTask,
  addTaskFulfilled,
  deleteTaskFulfilled,
  deleteTask,
  changeTaskTitle,
  changeTaskTitleFulfilled,
  changeTaskDescriptionFulfilled,
  changeTaskDescription,
} = slice.actions
