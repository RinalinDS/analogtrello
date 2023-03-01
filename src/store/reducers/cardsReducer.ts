import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CardType } from '../../types/BoardsType'

export type CardsReducerStateType = {
  cards: CardType[]
}
const initialState: CardsReducerStateType = {
  cards: [],
}

const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    fetchCards: (_state, _action: PayloadAction<{ id: number }>) => {},
    fetchCardsFulfilled: (state, action: PayloadAction<CardType[]>) => {
      state.cards = action.payload
    },
    addCard: (_state, _action: PayloadAction<Partial<CardType>>) => {},
    addCardFulfilled: (state, action: PayloadAction<CardType>) => {
      state.cards.push(action.payload)
    },
  },
})

export const cardsReducer = slice.reducer

export const { fetchCards, fetchCardsFulfilled, addCard, addCardFulfilled } = slice.actions
