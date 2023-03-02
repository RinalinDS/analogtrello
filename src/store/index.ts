import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import logger from 'redux-logger'

import rootSaga from './sagas'
import { boardsReducer } from './reducers/boardsReducer'
import { cardsReducer } from './reducers/cardsReducer'
import { tasksReducer } from './reducers/tasksReducer'
import { appReducer } from './reducers/appReducer'
import { snackbarReducer } from './reducers/snackbarReducer'

const sagaMiddleware = createSagaMiddleware()

export const reducers = combineReducers({
  boards: boardsReducer,
  cards: cardsReducer,
  tasks: tasksReducer,
  app: appReducer,
  snackbar: snackbarReducer,
})

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware).concat(logger),
})
// .concat(logger),
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

sagaMiddleware.run(rootSaga)
