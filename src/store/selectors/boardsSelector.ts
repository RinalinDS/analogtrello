import { createSelector } from 'reselect'

import { AppRootStateType } from '../index'

export const selectBoards = (state: AppRootStateType) => state.boards.boards
export const selectFlag = (state: AppRootStateType) => state.boards.newBoardCreated
export const selectCurrentBoardId = (state: AppRootStateType) => state.boards.currentBoardId

export const selectCurrentBoard = createSelector(
  [selectBoards, (_, boardId: string | undefined) => ({ boardId })],
  (cards, { boardId }) => {
    if (!boardId) {
      return null
    }
    const card = cards.find(f => f.id === +boardId)
    if (!card) {
      return null
    }
    return card
  },
)
