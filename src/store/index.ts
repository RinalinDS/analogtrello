import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import logger from 'redux-logger'

import { testReducer } from './reducers/testReducer'
import rootSaga from './sagas/index.js'
import { boardReducer } from './reducers/boardReducer'

const sagaMiddleware = createSagaMiddleware()

export const reducers = combineReducers({
  test: testReducer,
  board: boardReducer,
})

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware).concat(logger),
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

sagaMiddleware.run(rootSaga)
