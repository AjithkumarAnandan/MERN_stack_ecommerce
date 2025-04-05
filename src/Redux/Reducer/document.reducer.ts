import { createSlice } from "@reduxjs/toolkit";
import { fetchDeleteList, fetchDocumentList, uploadDocument } from "../ActionThunk/document.action";


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
export const getDocumentDownloadSlice=createSlice({
    name:'Document/Get',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchDocumentList.pending,(state)=>{
            state.loading=true;
            state.error=null;
        }).addCase(fetchDocumentList.fulfilled,(state, action)=>{
            state.data=action.payload;
            state.loading=false;
        }).addCase(fetchDocumentList.rejected,(state, action)=>{
             state.error = typeof action.payload === 'string' ? action.payload : 'An error occurred';
             state.loading=false;
        })
    }
})



interface initialStateUploadProps{
    loading:boolean;
    data:any;
    error: string | null;
}
const initialUploadPostState:initialStateUploadProps={
    loading:false,
    data:[],
    error:null,
}
export const uploadDocumentSlice=createSlice({
    name:'Upload/Post',
    initialState:initialUploadPostState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(uploadDocument.pending,(state)=>{
            state.loading=true;
            state.error=null;
        }).addCase(uploadDocument.fulfilled,(state, action)=>{
            state.data=action.payload;
            state.loading=false;
        }).addCase(uploadDocument.rejected,(state, action)=>{
             state.error = typeof action.payload === 'string' ? action.payload : 'An error occurred';
             state.loading=false;
        })
    }
})



interface deleteListSliceStateProps{
    loading:boolean;
    data:any;
    error: string | null;
}
const deleteListSliceState:deleteListSliceStateProps={
    loading:false,
    data:[],
    error:null,
}
export const deleteListSlice=createSlice({
    name:'Upload/delete',
    initialState:deleteListSliceState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchDeleteList.pending,(state)=>{
            state.loading=true;
            state.error=null;
        }).addCase(fetchDeleteList.fulfilled,(state, action)=>{
            state.data=action.payload;
            state.loading=false;
        }).addCase(fetchDeleteList.rejected,(state, action)=>{
             state.error = typeof action.payload === 'string' ? action.payload : 'An error occurred';
             state.loading=false;
        })
    }
})