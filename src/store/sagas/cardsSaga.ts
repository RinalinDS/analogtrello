import { PayloadAction } from '@reduxjs/toolkit'

import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'

import { BoardType, CardType, ChangeCardTitlePayloadType } from '../../types/BoardsType'
import { Service } from '../../api/Service'
import {
  addCard,
  addCardFulfilled,
  changeCardTitle,
  changeCardTitleFulfilled,
  deleteCard,
  deleteCardFulfilled,
  fetchCards,
  fetchCardsFulfilled,
} from '../reducers/cardsReducer'
import { requestFinally, requestInitiated } from '../reducers/appReducer'
import { ErrorMessage, SuccessMessage } from '../../enums/Message'
import { addErrorMsg, addSuccessMsg } from '../reducers/snackbarReducer'

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

export function* deleteCardWorker(action: PayloadAction<{ id: number }>) {
  try {
    yield put(requestInitiated())
    yield call(Service.deleteCard, action.payload.id)
    yield put(deleteCardFulfilled({ id: action.payload.id }))
    yield put(addSuccessMsg(SuccessMessage.deleteCard))
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    yield put(addErrorMsg(error?.response?.data?.message || ErrorMessage.Some))
  } finally {
    yield put(requestFinally())
  }
}

export function* changeCardTitleWorker(action: PayloadAction<ChangeCardTitlePayloadType>) {
  try {
    yield put(requestInitiated())
    const res: AxiosResponse<CardType> = yield call(
      Service.changeCardTitle,
      action.payload.id,
      action.payload.title,
    )
    yield put(changeCardTitleFulfilled({ id: res.data.id, title: res.data.title }))
    yield put(addSuccessMsg(SuccessMessage.changeCardTitle))
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
  yield takeEvery(deleteCard.type, deleteCardWorker)
  yield takeEvery(changeCardTitle.type, changeCardTitleWorker)
}
