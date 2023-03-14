import { createSelector } from 'reselect'

import { AppRootStateType } from '../index'

export const selectBoards = (state: AppRootStateType) => state.boards.boards
export const selectIsNewBoardCreated = (state: AppRootStateType) => state.boards.isNewBoardCreated
export const selectCurrentBoardId = (state: AppRootStateType) => state.boards.currentBoardId

export const selectCurrentBoard = createSelector(
  [selectBoards, (_, boardId: string | undefined) => ({ boardId })],
  (boards, { boardId }) => {
    if (!boardId) {
      return null
    }
    const board = boards.find(f => f.id === +boardId)
    if (!board) {
      return null
    }
    return board
  },
)
