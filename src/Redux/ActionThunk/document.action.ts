import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "../Http/http";


export const fetchDocumentList=createAsyncThunk<any,any,{ rejectValue: string }>("upload/Get", async(_, thunkApi)=>{
try {
    const response=await HTTP.doGet(`api/documentslist`);
    return response.data;
} catch (error) {
    return await thunkApi.rejectWithValue((error as Error)?.message)
}
})


export const uploadDocument=createAsyncThunk<any,any,{ rejectValue: string }>("upload/Post", async(payload, thunkApi)=>{
try {
    const response=await HTTP.doPost('api/upload', payload);

    if(response.status===201){
       await HTTP.doGet(`api/documentslist`);
    }
    return response.data;
} catch (error) {
    return await thunkApi.rejectWithValue((error as Error)?.message)
}
})

