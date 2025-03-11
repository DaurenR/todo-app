import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Кастомный `useDispatch`, который сразу типизирован
export const useAppDispatch: () => AppDispatch = useDispatch

// Кастомный `useSelector` с правильной типизацией
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
