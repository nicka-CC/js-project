
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0
}
export const counterSlice = createSlice({
  name: 'counterReducer',
  initialState: initialState,
  reducers: {
    setCouter(state, action) {
      state.value = action.payload.value
    },
    resetCouter(state) {
      state.value = 0
    }
  }
})

export const { setCouter, resetCouter } = counterSlice.actions;
export default counterSlice.reducer;
