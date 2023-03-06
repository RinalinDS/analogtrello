import { AppRootStateType } from '../index'

export const selectBoards = (state: AppRootStateType) => state.boards.boards
export const selectCurrentBoard = (state: AppRootStateType) => state.boards.currentBoard
