import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { testReducer } from './reducers/testReducer'
import rootSaga from './sagas/index.js'
import logger from 'redux-logger'

const sagaMiddleware = createSagaMiddleware()

export const reducers = combineReducers({
  test: testReducer,
})

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware).concat(logger),
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

sagaMiddleware.run(rootSaga)
