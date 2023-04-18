import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatModeState {
    value: string;
}

const initialState: ChatModeState = {
    value: "gpt-3.5-turbo",
};

export const chatModeSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        setChatMode: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setChatMode } = chatModeSlice.actions;

export default chatModeSlice.reducer;
