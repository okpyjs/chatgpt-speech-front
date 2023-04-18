import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setAudioMode } from "../redux/audioModeSlice";
import { setChatMode } from "../redux/chatModeSlice";
import { Button } from "@chakra-ui/react";

export default function ReduxTest() {
    const audioMode = useSelector((state: RootState) => state.audioMode.value);
    const chatMode = useSelector((state: RootState) => state.chatMode.value)
    const dispatch = useDispatch();

    const handleIncrementClick = () => {
        dispatch(setChatMode("hello"));
    };

    return (
        <div>
            <p>Count: {chatMode}</p>
            <Button onClick={handleIncrementClick}>Increment</Button>
        </div>
    );
}