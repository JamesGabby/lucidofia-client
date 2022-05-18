import { createSlice } from "@reduxjs/toolkit";

export const userNameSlice = createSlice({
  name: 'userName',
  initialState: [],
  reducers: {
    setUserName: (state, action) => {
      state = action.payload
      return state
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserName } = userNameSlice.actions

export default userNameSlice.reducer