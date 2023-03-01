import { AppRootStateType } from '../index'

export const selectBoards = (state: AppRootStateType) => state.boards.boards
