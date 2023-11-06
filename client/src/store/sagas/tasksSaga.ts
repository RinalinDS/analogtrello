import { PayloadAction } from '@reduxjs/toolkit'

import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'

import {
  CardType,
  ChangeDescriptionPayloadType,
  ChangeTaskTitlePayloadType,
  DeleteTaskPayloadType,
  TaskType,
} from '../../types/BoardsType'
import { Service } from '../../api/Service'
import {
  addTask,
  addTaskFulfilled,
  changeTaskDescription,
  changeTaskDescriptionFulfilled,
  changeTaskTitle,
  changeTaskTitleFulfilled,
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

export function* changeTaskTitleWorker(action: PayloadAction<ChangeTaskTitlePayloadType>) {
  try {
    yield put(requestInitiated())
    const res: AxiosResponse<TaskType> = yield call(Service.changeTaskTitle, action.payload)
    yield put(changeTaskTitleFulfilled(res.data))
    yield put(addSuccessMsg(SuccessMessage.changeTaskTitle))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(addErrorMsg(error?.response?.data?.message || ErrorMessage.Some))
  } finally {
    yield put(requestFinally())
  }
}

export function* changeTaskDescriptionWorker(action: PayloadAction<ChangeDescriptionPayloadType>) {
  try {
    yield put(requestInitiated())
    const res: AxiosResponse<TaskType> = yield call(Service.changeTaskDescription, action.payload)
    yield put(changeTaskDescriptionFulfilled(res.data))
    yield put(addSuccessMsg(SuccessMessage.changeTaskDescription))
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
  yield takeEvery(changeTaskTitle.type, changeTaskTitleWorker)
  yield takeEvery(changeTaskDescription.type, changeTaskDescriptionWorker)
}
