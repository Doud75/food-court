import { createSlice, configureStore } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    createConnection: (state, action) => {
      state = new WebSocket("ws://localhost:8097/ws/join/user/" + action.payload)
    }
  }
})

export const store = configureStore({
  reducer: {
    notification: notificationSlice.reducer
  }
})