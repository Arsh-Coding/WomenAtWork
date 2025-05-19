import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPlans } from "../api";

export const fetchPlans = createAsyncThunk("plans/fetchPlans", async() => {
    const response = await getPlans();
    return response;
});

const planSlice = createSlice({
    name: "plans",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchPlans.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPlans.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchPlans.rejected, (state, action) => {
            state.loading = false,
            state.error = action.error.message;
        })
    },
})
export default planSlice.reducer;