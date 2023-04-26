import { ReactNode, useState, useRef, useEffect } from 'react';
import {
    Box,
    Text,
    Flex,
    useColorModeValue,
    Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

export default function Home() {
    interface chatInterface {
        role: string;
        content: string;
    }
    interface audioInterface {
        status: boolean;
        token: string;
    }
    const navigate = useNavigate();
    const audioModel = useSelector((state: RootState) => state.audioMode.value)
    const chatModel = useSelector((statte: RootState) => statte.chatMode.value)
    const textAreaRef = useRef<HTMLTextAreaElement>();
    const userChatBgColor = useColorModeValue("gray.500", "gray.500");
    const systemChatBgColor = useColorModeValue("gray.100", "gray.700");
    const [audioPath, setAudioPath] = useState<audioInterface[]>([]);
    const [descriptionFlag, setDescriptionFlag] = useState("block");
    const [userChatList, setUserChatList] = useState<chatInterface[]>([]);
    const [systemChatList, setSystemChatList] = useState<chatInterface[]>([]);
    const [userText, setUserText] = useState("");
    const [disableFlag, setDisableFlag] = useState(false);
    const [textAreaPos, setTextAreaPos] = useState('auto');
    const [loading, setLoading] = useState('メッセージを入力してください');
    const [chatDeep, setChatDeep] = useState<number>(3);
    // const [audioModel, setAudioModel] = useState<string>('Nanami');
    // const [chatModel, setChatModel] = useState<string>('gpt-3.5-turbo');

    useEffect(() => {
        textAreaRef.current?.focus()
    }, [])

    useEffect(() => {
        let chatArea = document.getElementById('chatArea');
        chatArea?.scrollBy(0, chatArea?.scrollHeight)
    }, [userChatList, systemChatList])

    async function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function sendMessage(e: any) {
        if (!e.shiftKey && e.key == "Enter") {
            if(localStorage.getItem('token') === null){
                navigate('/login');
            }
            e.preventDefault();
            if (userText.replace(/\s/g, '').length) {
                setDescriptionFlag("none");
                let temp: any[] = [...userChatList];
                temp.push({ 'role': 'user', 'content': userText });
                setUserChatList(temp);
                setUserText("");
                setTextAreaPos('0');
                setDisableFlag(true);
                setLoading('文章作成中...');
                // after receiving data
                let data = {
                    user_message: JSON.stringify(temp.slice(0-chatDeep)), 
                    system_message: JSON.stringify([...systemChatList].slice(0-chatDeep)), 
                    audio_model: audioModel,
                    chat_model: chatModel
                }
                console.log(data)

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
                  
                axios.post(
                    `${process.env.REACT_APP_API_URL}/api/chat/`,
                    data, {
                        headers: headers
                    }
                ).then((resp) => {
                    console.log(resp.data)
                    setDisableFlag(false);
                    setLoading('メッセージを入力してください');
                    let temp: any[] = [...systemChatList];
                    temp.push({ 'role': 'system', 'content': resp.data['message']})
                    setSystemChatList(temp)
                    let audioTemp: audioInterface[] = [...audioPath];
                    audioTemp.push({status: false, token: resp.data["audioToken"]})
                    setAudioPath(audioTemp)
                    delay(30).then(() => {
                        if (textAreaRef.current) {
                            textAreaRef.current.focus();
                        }
                    })
                })
                .catch((error) => {
                    console.log(error)
                    navigate('/login');
                    setDisableFlag(false);
                    setLoading('メッセージを入力してください');
                    let audioTemp: audioInterface[] = [...audioPath];
                    audioTemp.push({status: false, token: "error"})
                    setAudioPath(audioTemp)
                    delay(30).then(() => {
                        let temp: any[] = [...systemChatList];
                        temp.push({ 'role': 'system', 'content': '現在のGPTモデルはご利用いただけません。' })
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
                    <Flex fontSize={{ base: 16, md: 24 }} align={'center'} justify={'center'}>
                        <Text>~音声学習 for ChatGPT~</Text>
                    </Flex>
                    <Flex justify={'center'}>
                        <Text
                            fontSize={{ base: 20, md: 32 }}
                            align={'center'}
                        >
                            耳で学ぼう、音声チャット、音声学習ができる
                        </Text>
                    </Flex>
                </Box>
                <Box
                    alignItems={'center'}
                    pos={'fixed'}
                    // height={"50%"}
                    // width={"80%"}
                    left={{ base: 3, md: 250 }}
                    top={100}
                    right={3}
                    bottom={100}
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
                                    <Text
                                        p={2}
                                        m={1}
                                        borderRadius={5}
                                        justifySelf={'end'}
                                        bg={userChatBgColor}
                                    >
                                        {chat.content}
                                    </Text>
                                </Flex>
                                {
                                    systemChatList[i] &&
                                    <>
                                        <Flex justify={'left'}>
                                            <Text
                                                p={2}
                                                m={1}
                                                borderRadius={5}
                                                justifySelf={'end'}
                                                bg={systemChatBgColor}
                                            >
                                                {systemChatList[i].content}
                                            </Text>
                                        </Flex>
                                        <Flex justify={'left'}>
                                            <audio controls style={{ height: '35px' }} autoPlay>
                                                <source src={`${process.env.REACT_APP_API_URL}/api/audio?token=${audioPath[i].token}`} type="audio/mp3" />
                                            </audio>
                                        </Flex>
                                    </>
                                }
                            </Box>
                        )
                    })}
                </Box>
                <Flex justify={'center'}
                    pos={'fixed'}
                    left={{ base: 3, md: 250 }}
                    right={3}
                    bottom={textAreaPos}
                >
                    <Textarea
                        mt={5}
                        mb={1.5}
                        // width={"80%"}
                        placeholder={loading}
                        onKeyDown={(e) => { sendMessage(e) }}
                        value={userText}
                        onChange={(e) => { setUserText(e.target.value) }}
                        isDisabled={disableFlag}
                        ref={textAreaRef as React.RefObject<HTMLTextAreaElement>}
                    >
                    </Textarea>
                </Flex>
            </Box>
        </>
    )
}

