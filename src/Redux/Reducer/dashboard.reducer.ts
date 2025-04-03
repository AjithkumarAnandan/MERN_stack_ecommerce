import { createSlice } from "@reduxjs/toolkit";
import { createDashboard, fetchDashboard } from "../ActionThunk/dashboard.action";


interface initialStateProps{
    loading:boolean;
    data:any;
    error: string | null;
}
const initialState:initialStateProps={
    loading:false,
    data:[],
    error:null,
}
export const dashboardSlice=createSlice({
    name:'dashboard',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchDashboard.pending,(state)=>{
            state.loading=true;
            state.error=null;
        }).addCase(fetchDashboard.fulfilled,(state, action)=>{
            state.data=action.payload;
            state.loading=false;
        }).addCase(fetchDashboard.rejected,(state, action)=>{
             state.error = typeof action.payload === 'string' ? action.payload : 'An error occurred';
             state.loading=false;
        })
    }
})



interface initialStatePostProps{
    loading:boolean;
    data:any;
    error: string | null;
}
const initialPostState:initialStatePostProps={
    loading:false,
    data:[],
    error:null,
}
export const dashboardPostSlice=createSlice({
    name:'dashboard/Post',
    initialState:initialPostState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createDashboard.pending,(state)=>{
            state.loading=true;
            state.error=null;
        }).addCase(createDashboard.fulfilled,(state, action)=>{
            state.data=action.payload;
            state.loading=false;
        }).addCase(createDashboard.rejected,(state, action)=>{
             state.error = typeof action.payload === 'string' ? action.payload : 'An error occurred';
             state.loading=false;
        })
    }
})