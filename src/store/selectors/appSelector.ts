import { AppRootStateType } from '../index'

export const selectMessages = (state: AppRootStateType) => state.app.messages
