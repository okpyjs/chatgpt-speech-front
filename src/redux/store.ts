import { configureStore } from "@reduxjs/toolkit";
import audioModeReducer from "./audioModeSlice";
import chatModeReducer from "./chatModeSlice";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        audioMode: audioModeReducer,
        chatMode: chatModeReducer,
        userInfo: userReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
