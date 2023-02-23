import { TypedUseSelectorHook } from 'react-redux'
import { useSelector } from 'react-redux/es/exports'
import { AppRootStateType } from '../store'

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
