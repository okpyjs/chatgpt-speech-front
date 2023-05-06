import { ReactNode, useState, useRef, useEffect } from 'react';
import {
    Box,
    Text,
    Flex,
    useColorModeValue,
    Textarea,
    Link,
    Tooltip,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { FaEraser } from "react-icons/fa"
import { useDispatch } from "react-redux";
import { setModeDisable } from '../../redux/modeDisableSlice';

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
    const dispatch = useDispatch();
    const toast = useToast();
    const audioModel = useSelector((state: RootState) => state.audioMode.value);
    const chatModel = useSelector((statte: RootState) => statte.chatMode.value);
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
    const [eraserOpacity, setEraserOpacity] = useState<string>("20%");
    const [firstChatFlag, setFirstChatFlag] = useState<boolean>(true);
    const [lastSystemChat, setLastSystemChat] = useState<string>();
    const [letterWritingSpeed, setLetterWritingSpeed] = useState<number>(20);
    // const [audioModel, setAudioModel] = useState<string>('Nanami');
    // const [chatModel, setChatModel] = useState<string>('gpt-3.5-turbo');

    useEffect(() => {
        textAreaRef.current?.focus();
    }, []);

    useEffect(() => {
        let chatArea = document.getElementById('chatArea');
        chatArea?.scrollBy(0, chatArea?.scrollHeight)
    }, [userChatList, systemChatList])

    async function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function clear() {
        setUserChatList([...[]]);
        setSystemChatList([...[]]);
        setFirstChatFlag(true);
        setAudioPath([...[]]);
        textAreaRef.current?.focus();
    }

    function sendMessage(e: any) {
        if (!e.shiftKey && e.key == "Enter") {
            if(localStorage.getItem('token') === null){
                navigate('/login');
            }
            e.preventDefault();
            if (userText.replace(/\s/g, '').length) {
                dispatch(setModeDisable(true))
                setDescriptionFlag("none");
                let temp: any[] = [...userChatList];
                temp.push({ 'role': 'user', 'content': userText });
                setUserChatList([...temp]);
                setUserText("");
                setTextAreaPos('0');
                setDisableFlag(true);
                setLoading('文章作成中...');
                // after receiving data
                let data = {
                    user_message: JSON.stringify(temp.slice(0-chatDeep)), 
                    system_message: JSON.stringify([...systemChatList].slice(0-chatDeep)), 
                    audio_model: audioModel,
                    chat_model: chatModel,
                    first_chat: firstChatFlag
                }
                console.log(data);

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
                    setFirstChatFlag(false)
                    setLoading('メッセージを入力してください');
                    let temp: any[] = [...systemChatList];
                    temp.push({ 'role': 'system', 'content': resp.data['message']})
                    setSystemChatList([...temp])
                    let lastMsg = ""
                    for(let i in resp.data["message"]) {
                        delay(parseInt(i) * letterWritingSpeed).then(() => {
                            lastMsg += resp.data["message"][i]
                            setLastSystemChat(lastMsg)
                        })
                    }
                    delay((resp.data["message"].length - 1) * letterWritingSpeed).then(() => {
                        setDisableFlag(false);
                    })
                    let audioTemp: audioInterface[] = [...audioPath];
                    audioTemp.push({status: false, token: resp.data["audioToken"]})
                    setAudioPath(audioTemp)
                    delay((resp.data["message"].length - 1) * letterWritingSpeed + 30).then(() => {
                        if (textAreaRef.current) {
                            textAreaRef.current.focus();
                            dispatch(setModeDisable(false))
                        }
                    })
                })
                .catch((error) => {
                    setDisableFlag(false);
                    setLoading('メッセージを入力してください');
                    if(error.message == "Network Error") {
                        toast({
                            title: 'ネットワークエラー',
                            // description: "We've created your account for you.",
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                            position: 'top-right'
                        })
                    }else{
                        if(error.response.status == 401) {
                            navigate('/login');
                        }
                        let audioTemp: audioInterface[] = [...audioPath];
                        audioTemp.push({status: false, token: "error"})
                        setAudioPath(audioTemp)
                        let errorMsg: any = '現在のGPTモデルはご利用いただけません。'
                        let temp: any[] = [...systemChatList];
                        temp.push({ 'role': 'system', 'content': errorMsg })
                        setSystemChatList([...temp])
                        let lastMsg = ""
                        for(let i in errorMsg) {
                            delay(parseInt(i) * letterWritingSpeed).then(() => {
                                lastMsg += errorMsg[i]
                                setLastSystemChat(lastMsg)
                            })
                        }
                        delay((errorMsg.length - 1) * letterWritingSpeed).then(() => {
                            if (textAreaRef.current) {
                                textAreaRef.current.focus();
                                dispatch(setModeDisable(false))
                            }
                        });
                    }
                });
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
                                        whiteSpace={'pre-wrap'}
                                        wordBreak={'break-all'}
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
                                                whiteSpace={'pre-wrap'}
                                                wordBreak={'break-all'}
                                            >
                                                {i == systemChatList.length - 1 ?
                                                    lastSystemChat:
                                                    systemChatList[i].content
                                                }
                                            </Text>
                                        </Flex>
                                        <Flex justify={'left'}>
                                            <audio controls style={{ height: '35px' }}>
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
                {descriptionFlag != "block" &&
                    <Flex pos={'absolute'} bottom={"100px"} right={"30px"} fontSize={"50px"} opacity={eraserOpacity}>
                        <Tooltip label="クリア">
                        <Link 
                            onMouseEnter={() => setEraserOpacity("100%")} 
                            onMouseLeave={() => setEraserOpacity("20%")}
                            onClick={() => clear()}
                        ><FaEraser /></Link>
                        </Tooltip>
                    </Flex>
                }
            </Box>
        </>
    )
}

