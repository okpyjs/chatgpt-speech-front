import {
    Menu,
    MenuButton,
    MenuList,
    Button,
    MenuGroup,
    MenuItem,
    MenuDivider,
    Text,
    Box,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setAudioMode } from "../../redux/audioModeSlice";
import { setChatMode } from "../../redux/chatModeSlice";
import { setModeDisable } from "../../redux/modeDisableSlice";
import styles from '../../assets/custom.module.css'
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";


interface ItemList {
    audio: string[],
    chat: string[],
}

const itemList: ItemList = {
    audio: [
        "Nanami",
        "Aoi",
        "Daichi",
        "Keita",
        "Mayu",
        "Naoki",
        "Shiori"
    ],
    chat: [
        "gpt-3.5-turbo",
        "gpt-3.5-turbo-0301",
        "text-davinci-003",
        "text-davinci-002",
        "code-davinci-002",
        "gpt-4",
        "gpt-4-0314",
        "gpt-4-32k",
        "gpt-4-32k-0314"
    ],
}

const Mode = ({category}: {category: string}) => {
    const audioModel = useSelector((state: RootState) => state.audioMode.value)
    const chatModel = useSelector((state: RootState) => state.chatMode.value)
    const modeDisable = useSelector((state: RootState) => state.modeDisable.value)
    const categoryBtnBg = useColorModeValue("gray.500", "gray.500");
    const dispatch = useDispatch()

    const setMode = (category: string, item: string) => {
        if (category == 'audio') dispatch(setAudioMode(item));
        if (category == 'chat') dispatch(setChatMode(item));
    }

    return(
    <Box mr={2}>
        <Menu>
            <MenuButton as={Button} isDisabled={modeDisable} bg={categoryBtnBg} fontSize={12} mr={2} className={category=="audio" ? styles.mode: "none"}>
                {
                    category == 'chat' &&
                        <>GPTモデル</>
                }
                {
                    category == 'audio' &&
                        <>スピーチモデル</>
                }
            </MenuButton>
            <MenuList>
                {/* <MenuGroup title='Profile'>
                <MenuItem>My Account</MenuItem>
                <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider /> */}
                {
                    itemList[category as keyof ItemList].map((item, i) => {
                        return <MenuItem key={i} onClick={() => {setMode(category, item)}}>{item}</MenuItem>
                    })
                }
            </MenuList>
            {category == "audio"?
                <span className={category=="audio" ? styles.mode: "none"}>{audioModel}</span>:
                <span>{chatModel}</span>
            }
        </Menu>
    </Box>
    )
}

export default Mode;