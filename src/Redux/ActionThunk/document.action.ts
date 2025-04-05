import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "../Http/http";


export const fetchDocumentList=createAsyncThunk<any,any,{ rejectValue: string }>("upload/Get", async(_, thunkApi)=>{
try {
    const response=await HTTP.doGet(`api/documentslist`);
    return response.data;
} catch (error) {
    return thunkApi.rejectWithValue((error as Error)?.message)
}
})


export const uploadDocument=createAsyncThunk<any,any,{ rejectValue: string }>("upload/Post", async(payload, thunkApi)=>{
try {
    const response=await HTTP.doPost('api/upload', payload);

    if(response.status===201){
       await thunkApi.dispatch(fetchDocumentList(null));
    }
    return response.data;
} catch (error) {
    return thunkApi.rejectWithValue((error as Error)?.message)
}
})

export const fetchDeleteList=createAsyncThunk<any,any,{ rejectValue: string }>("upload/Delete", async(filename, thunkApi)=>{
try {
    const response=await HTTP.doDelete(`api/documentDelete/filename=<typeData>`.replace('<typeData>', encodeURIComponent(filename)));
      if(response.status===201){
       await thunkApi.dispatch(fetchDocumentList(null));
    }
    return response.data;
} catch (error) {
    return thunkApi.rejectWithValue((error as Error)?.message)
}
})
