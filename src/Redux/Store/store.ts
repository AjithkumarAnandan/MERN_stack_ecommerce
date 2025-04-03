import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { dashboardPostSlice, dashboardSlice } from "../Reducer/dashboard.reducer";

const store=configureStore({
    reducer: {
        dashboard:combineReducers({
                postDashboard: dashboardPostSlice.reducer,
                getDashboard: dashboardSlice.reducer,
        }),
    }    
})
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch