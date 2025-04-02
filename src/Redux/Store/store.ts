import { configureStore } from "@reduxjs/toolkit";
import { dashboardSlice } from "../Reducer/dashboard.reducer";

const store=configureStore({
    reducer:{
        dashbaoard:dashboardSlice.reducer
    }
})
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch