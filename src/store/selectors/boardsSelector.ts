import { createSelector } from 'reselect'

import { AppRootStateType } from '../index'

export const selectBoards = (state: AppRootStateType) => state.boards.boards
export const selectCurrentBoardId = (state: AppRootStateType) => state.boards.currentBoardId

export const selectCurrentBoard = createSelector(
  [selectBoards, (_, boardId: string | undefined) => ({ boardId })],
  (cards, { boardId }) => {
    if (!boardId) {
      return undefined
    }
    return cards.find(f => f.id === +boardId)
  },
)
