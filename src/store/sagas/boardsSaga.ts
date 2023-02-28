import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { AxiosError, AxiosResponse } from 'axios'

import { PayloadAction } from '@reduxjs/toolkit'

import { Service } from '../../api/Service'
import { BoardType, CardType, TaskType } from '../../types/BoardsType'
import {
  addBoard,
  addBoardFulfilled,
  addCard,
  addCardFulfilled,
  addTask,
  addTaskFulfilled,
  fetchBoards,
  fetchBoardsFulfilled,
  fetchCards,
  fetchCardsFulfilled,
  fetchTasks,
  fetchTasksFulfilled,
  requestFinally,
  requestReject,
} from '../reducers/boardsReducer'

export function* getBoardsWorker() {
  try {
    const res: AxiosResponse<BoardType[]> = yield call(Service.getBoards)
    yield put(fetchBoardsFulfilled(res.data))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(requestReject(error?.response?.data?.message || 'Some error'))
  } finally {
    yield put(requestFinally())
  }
}

export function* getCardsWorker(action: PayloadAction<{ id: number }>) {
  try {
    const res: AxiosResponse<BoardType & { cards: CardType[] }> = yield call(
      Service.getCards,
      action.payload.id,
    )
    yield put(fetchCardsFulfilled(res.data.cards))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(requestReject(error?.response?.data?.message || 'Some error'))
  } finally {
    yield put(requestFinally())
  }
}

export function* getTasksWorker(action: PayloadAction<{ id: number }>) {
  try {
    const res: AxiosResponse<CardType & { tasks: TaskType[] }> = yield call(
      Service.getTasks,
      action.payload.id,
    )
    yield put(fetchTasksFulfilled({ tasks: res.data.tasks, id: res.data.id }))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(requestReject(error?.response?.data?.message || 'Some error'))
  } finally {
    yield put(requestFinally())
  }
}

export function* addBoardWorker(action: PayloadAction<BoardType>) {
  try {
    const res: AxiosResponse<BoardType> = yield call(Service.addBoard, action.payload)
    yield put(addBoardFulfilled(res.data))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(requestReject(error?.response?.data?.message || 'Some error'))
  } finally {
    yield put(requestFinally())
  }
}

export function* addCardWorker(action: PayloadAction<CardType>) {
  try {
    const res: AxiosResponse<CardType> = yield call(Service.addCard, action.payload)
    yield put(addCardFulfilled(res.data))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(requestReject(error?.response?.data?.message || 'Some error'))
  } finally {
    yield put(requestFinally())
  }
}

export function* addTaskWorker(action: PayloadAction<TaskType>) {
  try {
    const res: AxiosResponse<TaskType> = yield call(Service.addTask, action.payload)
    yield put(addTaskFulfilled(res.data))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(requestReject(error?.response?.data?.message || 'Some error'))
  } finally {
    yield put(requestFinally())
  }
}

export function* BoardsWatcher() {
  yield takeEvery(fetchBoards.type, getBoardsWorker)
  yield takeEvery(addBoard.type, addBoardWorker)
  yield takeEvery(fetchCards.type, getCardsWorker)
  yield takeEvery(addCard.type, addCardWorker)
  yield takeEvery(fetchTasks.type, getTasksWorker)
  yield takeEvery(addTask.type, addTaskWorker)
}
// TAK EVERY SUKA NE TAKE LATEST !!!!
// action.type nado lovit gramotno
