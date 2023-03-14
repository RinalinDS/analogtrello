import { call, put, takeEvery } from 'redux-saga/effects'
import { AxiosError, AxiosResponse } from 'axios'

import { PayloadAction } from '@reduxjs/toolkit'

import { Service } from '../../api/Service'
import { BoardType } from '../../types/BoardsType'
import {
  addBoard,
  addBoardFulfilled,
  deleteBoard,
  deleteBoardFulfilled,
  fetchBoards,
  fetchBoardsFulfilled,
  toggleIsNewBoardCreated,
} from '../reducers/boardsReducer'
import { requestFinally, requestInitiated } from '../reducers/appReducer'
import { ErrorMessage, SuccessMessage } from '../../enums/Message'
import { addErrorMsg, addSuccessMsg } from '../reducers/snackbarReducer'

export function* getBoardsWorker() {
  try {
    yield put(requestInitiated())
    const res: AxiosResponse<BoardType[]> = yield call(Service.getBoards)
    yield put(fetchBoardsFulfilled(res.data))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(addErrorMsg(error?.response?.data?.message || ErrorMessage.Some))
  } finally {
    yield put(requestFinally())
  }
}

export function* addBoardWorker(action: PayloadAction<BoardType>) {
  try {
    yield put(requestInitiated())
    const res: AxiosResponse<BoardType> = yield call(Service.addBoard, action.payload)
    yield put(addBoardFulfilled(res.data))
    yield put(addSuccessMsg(SuccessMessage.Board))
    yield put(toggleIsNewBoardCreated(true))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(addErrorMsg(error?.response?.data?.message || ErrorMessage.Some))
  } finally {
    yield put(requestFinally())
  }
}

export function* deleteBoardWorker(action: PayloadAction<{ id: number }>) {
  try {
    yield put(requestInitiated())
    yield call(Service.deleteBoard, action.payload.id)
    yield put(deleteBoardFulfilled({ id: action.payload.id }))
    yield put(addSuccessMsg(SuccessMessage.deleteBoard))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(addErrorMsg(error?.response?.data?.message || ErrorMessage.Some))
  } finally {
    yield put(requestFinally())
  }
}

export function* BoardsWatcher() {
  yield takeEvery(fetchBoards.type, getBoardsWorker)
  yield takeEvery(addBoard.type, addBoardWorker)
  yield takeEvery(deleteBoard.type, deleteBoardWorker)
}
