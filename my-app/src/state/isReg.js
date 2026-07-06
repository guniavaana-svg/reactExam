import { createSlice } from '@reduxjs/toolkit'
export const isRegSlice = createSlice({
  name: 'counter',
  initialState: {
    value:JSON.parse(localStorage.getItem("isAuth")) ||false,
  },
  reducers: {
    logIn: (state, action) => {
      state.value=action.payload
      localStorage.setItem("isAuth",JSON.stringify(action.payload))
    },
    logOut:(state,action)=>{
      state.value=false
      localStorage.setItem("isAuth", "false")
    }
  },
})

// Action creators are generated for each case reducer function
export const {logIn ,logOut} = isRegSlice.actions

export default isRegSlice.reducer