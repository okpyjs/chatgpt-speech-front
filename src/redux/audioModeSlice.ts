import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AudioModeState {
    value: string;
}

const initialState: AudioModeState = {
    value: 'Nanami',
};

export const audioModeSlice = createSlice({
    name: "audio mode",
    initialState,
    reducers: {
        setAudioMode: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setAudioMode } = audioModeSlice.actions;

export default audioModeSlice.reducer;
