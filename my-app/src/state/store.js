import { configureStore } from '@reduxjs/toolkit'
import isRegReducer from './isReg'

export default configureStore({
  reducer: {
    isreg: isRegReducer,
  },
})