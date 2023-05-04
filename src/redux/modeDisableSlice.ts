import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModeDisableState {
    value: boolean;
}

const initialState: ModeDisableState = {
    value: false,
};

export const modeDisableSlice = createSlice({
    name: "modeDisable",
    initialState,
    reducers: {
        setModeDisable: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        },
    },
});

export const { setModeDisable } = modeDisableSlice.actions;

export default modeDisableSlice.reducer;
