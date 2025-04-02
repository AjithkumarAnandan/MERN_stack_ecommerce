import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "../Http/http";

export const fetchDashboard=createAsyncThunk("dashboard/Get", async(_, thunkApi)=>{
try {
    const response=await HTTP.doGet('/api/auth/dashboard');
    return response.data;
} catch (error) {
    return await thunkApi.rejectWithValue((error as Error)?.message)
}
})

