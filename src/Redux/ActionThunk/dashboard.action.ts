import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "../Http/http";

export const fetchDashboard=createAsyncThunk("dashboard/Get", async(_, thunkApi)=>{
try {
    const response=await HTTP.doGet('/api/dashboard');
    return response.data;
} catch (error) {
    return await thunkApi.rejectWithValue((error as Error)?.message)
}
})


export const createDashboard=createAsyncThunk<any,any,{ rejectValue: string }>("dashboard/Post", async(payload, thunkApi)=>{
try {
    const response=await HTTP.doPost('api/dashboard', payload);
    return response.data;
} catch (error) {
    return await thunkApi.rejectWithValue((error as Error)?.message)
}
})

