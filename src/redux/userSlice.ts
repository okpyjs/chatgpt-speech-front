import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
    email: string;
}

const initialState: userState = {
    email: '',
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
