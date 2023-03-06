import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DeleteTaskPayloadType, TaskType } from '../../types/BoardsType'

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
} = slice.actions
