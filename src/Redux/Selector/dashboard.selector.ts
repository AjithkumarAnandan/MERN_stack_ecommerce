import { createSelector } from "reselect";

export const getDashboard= createSelector((state)=>state.dashboard, (subState)=>subState?.data??[]) 