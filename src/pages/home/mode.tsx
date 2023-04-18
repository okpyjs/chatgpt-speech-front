import {
    Menu,
    MenuButton,
    MenuList,
    Button,
    MenuGroup,
    MenuItem,
    MenuDivider,
    Box,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setAudioMode } from "../../redux/audioModeSlice";
import { setChatMode } from "../../redux/chatModeSlice";

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
    const categoryBtnBg = useColorModeValue("gray.500", "gray.500");
    const dispatch = useDispatch()

    const setMode = (category: string, item: string) => {
        if (category == 'audio') dispatch(setAudioMode(item));
        if (category == 'chat') dispatch(setChatMode(item));
    }

    return(
    <Box ml={2.5}>
        <Menu>
        <MenuButton as={Button} bg={categoryBtnBg} fontSize={12}>
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
        </Menu>
    </Box>
    )
}

export default Mode;