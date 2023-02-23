import { all } from 'redux-saga/effects'
import { TestWatcher } from './testSaga'

export default function* rootSaga() {
  yield all([TestWatcher()])
}
