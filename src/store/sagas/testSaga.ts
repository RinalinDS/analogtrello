import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosError, AxiosResponse } from 'axios'

import {
  fetchPostFulfilled,
  fetchPosts,
  fetchPostsFinally,
  fetchPostsReject,
} from '../reducers/testReducer'
import { Service } from '../../api/Service'
import { PostType } from '../../types/PostType'

export function* testWorker(action: any) {
  try {
    const res: AxiosResponse<PostType> = yield call(Service.getPost, action.payload.id)
    yield put(fetchPostFulfilled(res.data))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(fetchPostsReject(error?.response?.data?.message || 'Some error'))
  } finally {
    yield put(fetchPostsFinally(false))
  }
}

export function* TestWatcher() {
  yield takeLatest(fetchPosts, testWorker)
}
