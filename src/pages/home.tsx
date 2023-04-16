import { ReactNode, useState, useRef, useEffect } from 'react';
import {
    Box,
    Text,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    useBreakpointValue,
    Stack,
    Textarea,
    Input
} from '@chakra-ui/react';

export default function Home() {
    interface chatInterface {
        role: string;
        content: string;
    }
    const textAreaRef = useRef<HTMLTextAreaElement>();
    const userChatBgColor = useColorModeValue("gray.500", "gray.500");
    const systemChatBgColor = useColorModeValue("gray.100", "gray.700");
    const [descriptionFlag, setDescriptionFlag] = useState("block");
    const [userChatList, setUserChatList] = useState<chatInterface[]>([]);
    const [systemChatList, setSystemChatList] = useState<chatInterface[]>([]);
    const [userText, setUserText] = useState("");
    const [disableFlag, setDisableFlag] = useState(false);
    const [textAreaPos, setTextAreaPos] = useState('auto');
    const [loading, setLoading] = useState('メッセージを入力してください');

    useEffect(() => {
        textAreaRef.current?.focus()
    }, [])

    useEffect(() => {
        let chatArea = document.getElementById('chatArea');
        chatArea?.scrollBy(0, chatArea?.scrollHeight)
    }, [userChatList, systemChatList])
    
    async function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    
    function sendMessage(e: any) {
        if (!e.shiftKey && e.key == "Enter") {
            e.preventDefault();
            if(userText.replace(/\s/g, '').length){
                setDescriptionFlag("none");
                let temp: any[] = [...userChatList];
                temp.push({'role': 'user', 'content': userText});
                setUserChatList(temp);
                setUserText("");
                setTextAreaPos('0');
                setDisableFlag(true);
                setLoading('文章作成中...');
                // after receiving data
                delay(0).then(() => {
                    setDisableFlag(false);
                    setLoading('メッセージを入力してください');
                    delay(30).then(()=> {
                        let temp: any[] = [...systemChatList];
                        temp.push({'role': 'system', 'content': 'system'})
                        setSystemChatList(temp)
                        if (textAreaRef.current) {
                            textAreaRef.current.focus();
                        }
                    })
                })
            }
        }
    }
    
    return (
    <>
        <Box>
            <Box display={descriptionFlag} mt={250}>
                <Flex fontSize={{base: 16, md: 24}} align={'center'} justify={'center'}>
                    <Text>~音声学習 for ChatGPT~</Text>
                </Flex>
                <Flex justify={'center'}>
                    <Text fontSize={{base: 20, md: 32}} align={'center'}>耳で学ぼう、音声チャット、音声学習ができる</Text>
                </Flex>
            </Box>
            <Box 
                alignItems={'center'} 
                pos={'fixed'} 
                top={70} 
                bottom={100} 
                right={5} 
                left={5} 
                overflowY={"auto"} 
                id='chatArea' 
                css={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: "#56c9c7",
                        borderRadius: '24px',
                    },
                }}
            >
                {userChatList.map((chat, i) => {
                    // if (chat.role == 'user'){
                        return (
                            <Box key={i}>
                                <Flex justify={'right'}>
                                    <Text p={2} m={1} borderRadius={5} justifySelf={'end'} bg={userChatBgColor}>{chat.content}</Text>
                                </Flex>
                                {
                                systemChatList[i] &&
                                    <>
                                        <Flex justify={'left'}>
                                            <Text p={2} m={1} borderRadius={5} justifySelf={'end'} bg={systemChatBgColor}>{systemChatList[i].content}</Text>
                                        </Flex>
                                        <Flex justify={'left'}>
                                            <audio controls style={{height: '35px'}} autoPlay>
                                                <source src="s.mp3" type="audio/mp3"/>
                                            </audio>
                                        </Flex>
                                    </>
                                }
                            </Box>
                        )
                })}
            </Box>
            <Flex justify={'center'}>
                <Textarea 
                    mt={5} 
                    mb={1}
                    width={"80%"}
                    pos={'fixed'}
                    bottom={textAreaPos}
                    placeholder={loading} 
                    onKeyDown={(e) => {sendMessage(e)}}
                    value={userText}
                    onChange={(e) => {setUserText(e.target.value)}}
                    isDisabled={disableFlag}
                    ref={textAreaRef as React.RefObject<HTMLTextAreaElement>}
                >
                </Textarea>
            </Flex>
        </Box>
    </>
    )
}

