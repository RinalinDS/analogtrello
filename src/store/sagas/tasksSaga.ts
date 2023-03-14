import { PayloadAction } from '@reduxjs/toolkit'

import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'

import { CardType, DeleteTaskPayloadType, TaskType } from '../../types/BoardsType'
import { Service } from '../../api/Service'
import {
  addTask,
  addTaskFulfilled,
  deleteTask,
  deleteTaskFulfilled,
  fetchTasks,
  fetchTasksFulfilled,
} from '../reducers/tasksReducer'
import { requestFinally, requestInitiated } from '../reducers/appReducer'
import { ErrorMessage, SuccessMessage } from '../../enums/Message'
import { addErrorMsg, addSuccessMsg } from '../reducers/snackbarReducer'

export function* getTasksWorker(action: PayloadAction<{ id: number }>) {
  try {
    yield put(requestInitiated())
    const res: AxiosResponse<CardType & { tasks: TaskType[] }> = yield call(
      Service.getTasksByCardsId,
      action.payload.id,
    )
    yield put(fetchTasksFulfilled({ tasks: res.data.tasks, id: res.data.id }))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(addErrorMsg(error?.response?.data?.message || ErrorMessage.Some))
  } finally {
    yield put(requestFinally())
  }
}

export function* addTaskWorker(action: PayloadAction<TaskType>) {
  try {
    yield put(requestInitiated())
    const res: AxiosResponse<TaskType> = yield call(Service.addTask, action.payload)
    yield put(addTaskFulfilled(res.data))
    yield put(addSuccessMsg(SuccessMessage.Task))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(addErrorMsg(error?.response?.data?.message || ErrorMessage.Some))
  } finally {
    yield put(requestFinally())
  }
}

export function* deleteTaskWorker(action: PayloadAction<DeleteTaskPayloadType>) {
  try {
    yield put(requestInitiated())
    yield call(Service.deleteTask, action.payload.id)
    yield put(deleteTaskFulfilled({ id: action.payload.id, cardId: action.payload.cardId }))
    yield put(addSuccessMsg(SuccessMessage.deleteTask))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(addErrorMsg(error?.response?.data?.message || ErrorMessage.Some))
  } finally {
    yield put(requestFinally())
  }
}

export function* TasksWatcher() {
  yield takeEvery(fetchTasks.type, getTasksWorker)
  yield takeEvery(addTask.type, addTaskWorker)
  yield takeEvery(deleteTask.type, deleteTaskWorker)
}
