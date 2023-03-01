import { createSelector } from 'reselect'

import { AppRootStateType } from '../index'

const selectCards = (state: AppRootStateType) => state.cards.cards

export const selectTasksByCardId = createSelector(
  [selectCards, (_, boardId: string | undefined) => ({ boardId })],
  (cards, { boardId }) => {
    if (!boardId) {
      return []
    }
    return cards.filter(f => f.boardId === +boardId)
  },
)
