import { AppRootStateType } from '../index'

export const selectTheme = (state: AppRootStateType) => state.app.theme
export const selectIsLoading = (state: AppRootStateType) => state.app.isLoading
