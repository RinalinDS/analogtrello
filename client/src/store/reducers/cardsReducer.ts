import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CardType, ChangeCardTitlePayloadType } from '../../types/BoardsType'

import { deleteBoardFulfilled } from './boardsReducer'

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
    deleteCard: (_state, _action: PayloadAction<{ id: number }>) => {},
    deleteCardFulfilled: (state, action: PayloadAction<{ id: number }>) => {
      const index = state.cards.findIndex(f => f.id === action.payload.id)
      state.cards.splice(index, 1)
    },
    changeCardTitle: (_state, _action: PayloadAction<ChangeCardTitlePayloadType>) => {},
    changeCardTitleFulfilled: (state, action: PayloadAction<ChangeCardTitlePayloadType>) => {
      const index = state.cards.findIndex(f => f.id === action.payload.id)
      state.cards[index].title = action.payload.title
    },
  },
  extraReducers: builder => {
    builder.addCase(deleteBoardFulfilled, (state, action) => {
      state.cards = state.cards.filter(f => f.boardId !== action.payload.id)
    })
  },
})

export const cardsReducer = slice.reducer

export const {
  fetchCards,
  fetchCardsFulfilled,
  addCard,
  addCardFulfilled,
  deleteCard,
  deleteCardFulfilled,
  changeCardTitle,
  changeCardTitleFulfilled,
} = slice.actions
