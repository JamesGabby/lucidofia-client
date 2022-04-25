import { createSlice } from "@reduxjs/toolkit";

export const userTokenSlice = createSlice({
  name: 'userToken',
  initialState: [],
  reducers: {
    setUserToken: (state, action) => {
      state = action.payload
      return state
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserToken } = userTokenSlice.actions

export default userTokenSlice.reducer