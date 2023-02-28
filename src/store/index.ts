import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
import { boardsReducer } from './reducers/boardsReducer'

const sagaMiddleware = createSagaMiddleware()

export const reducers = combineReducers({
  boards: boardsReducer,
})

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
})
// .concat(logger),
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

sagaMiddleware.run(rootSaga)
