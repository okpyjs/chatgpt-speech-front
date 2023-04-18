import { ReactNode, useState, useRef, useEffect } from 'react';
import {
    Box,
    Text,
    Flex,
    useColorModeValue,
    Textarea,
} from '@chakra-ui/react';
import axios from 'axios';

export default function Home() {
    interface chatInterface {
        role: string;
        content: string;
    }
    interface audioInterface {
        status: boolean;
        token: string;
    }
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
                axios.post(
                    `${process.env.REACT_APP_API_URL}/api/chat/`,
                    {message: textAreaRef.current?.value, audio_model: 'Nanami'}
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
                    // axios.get(
                    //     `${process.env.REACT_APP_API_URL}/api/audio?token=${resp.data['audioToken']}`,
                    // ).then((resp) => {
                    //     // console.log(resp.data['byte'])
                    //     let audioTemp1: audioInterface[] = [...audioPath];
                    //     audioTemp1.push({status: true, byte: resp.data["byte"]})
                    //     // audioTemp1[audioTemp1.length-1].byte = resp.data['byte']
                    //     console.log(audioTemp1)
                    //     setAudioPath(audioTemp1)
                    //     // console.log(audioPath)
                    // })
                    delay(30).then(() => {
                        if (textAreaRef.current) {
                            textAreaRef.current.focus();
                        }
                    })
                })
                .catch((error) => {
                    console.log(error)
                    setDisableFlag(false);
                    setLoading('メッセージを入力してください');
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
                                {/* {
                                    audioPath[i] &&
                                    <Flex justify={'left'}>
                                        <AudioPlayer byteCodeString={audioPath[i].byte}/>
                                        {
                                        audioPath[i] && audioPath[i].status &&
                                            <audio controls style={{ height: '35px' }} autoPlay>
                                                <source src={`data:audio/mp3;base64,${btoa(String.fromCharCode())}`} type="audio/mp3" />
                                            </audio>
                                        }
                                    </Flex>
                                } */}

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

