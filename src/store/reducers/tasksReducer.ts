import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TaskType } from '../../types/BoardsType'

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
  },
})

export const tasksReducer = slice.reducer

export const { fetchTasks, fetchTasksFulfilled, addTask, addTaskFulfilled } = slice.actions
