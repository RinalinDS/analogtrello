import { all } from 'redux-saga/effects'

import { BoardsWatcher } from './boardsSaga'
import { CardsWatcher } from './cardsSaga'
import { TasksWatcher } from './tasksSaga'

export default function* rootSaga() {
  yield all([BoardsWatcher(), CardsWatcher(), TasksWatcher()])
}
