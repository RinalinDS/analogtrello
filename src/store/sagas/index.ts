import { all } from 'redux-saga/effects'

import { BoardsWatcher } from './boardsSaga'

export default function* rootSaga() {
  yield all([BoardsWatcher()])
}
