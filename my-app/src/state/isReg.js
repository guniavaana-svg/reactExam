import { createSlice } from '@reduxjs/toolkit'
import { useNavigate } from "react-router";
let navigate = useNavigate();
export const isRegSlice = createSlice({
  name: 'counter',
  initialState: {
    value: false,
  },
  reducers: {
    isValidate: (state, action) => {
      if(state.value===true){
            navigate("yourPage")
      }else {
        navigate("/")
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {isValidate } = counterSlice.actions

export default isRegSlice.reducer