import { PayloadAction } from '@reduxjs/toolkit'

import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'

import { BoardType, CardType } from '../../types/BoardsType'
import { Service } from '../../api/Service'
import {
  addCard,
  addCardFulfilled,
  fetchCards,
  fetchCardsFulfilled,
} from '../reducers/cardsReducer'
import {
  requestFinally,
  requestInitiated,
  addErrorMsg,
  addSuccessMsg,
} from '../reducers/appReducer'
import { ErrorMessage, SuccessMessage } from '../../enums/Message'

export function* addCardWorker(action: PayloadAction<CardType>) {
  try {
    yield put(requestInitiated())
    const res: AxiosResponse<CardType> = yield call(Service.addCard, action.payload)
    yield put(addCardFulfilled(res.data))
    yield put(addSuccessMsg(SuccessMessage.Card))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(addErrorMsg(error?.response?.data?.message || ErrorMessage.Some))
  } finally {
    yield put(requestFinally())
  }
}

export function* getCardsWorker(action: PayloadAction<{ id: number }>) {
  try {
    yield put(requestInitiated())
    const res: AxiosResponse<BoardType & { cards: CardType[] }> = yield call(
      Service.getCardsByBoardId,
      action.payload.id,
    )
    yield put(fetchCardsFulfilled(res.data.cards))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(addErrorMsg(error?.response?.data?.message || ErrorMessage.Some))
  } finally {
    yield put(requestFinally())
  }
}

export function* CardsWatcher() {
  yield takeEvery(fetchCards.type, getCardsWorker)
  yield takeEvery(addCard.type, addCardWorker)
}
