import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

export default function UserProfileEdit(): JSX.Element {

    const [editStatus, setEditStatus] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const [email, setEamil] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("https://static.deepl.com/img/logo/DeepL_Logo_darkBlue_v2.svg");
    const [oldPsw, setOldPsw] = useState<string>("");
    const [newPsw, setNewPsw] = useState<string>("");
    const [reNewPsw, setReNewPsw] = useState<string>("");
    const navigator = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem("email")
        console.log(email, "################")
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        const data = {
            email: email
        }
        axios.post(
            `${process.env.REACT_APP_API_URL}/api/userinfo/`,
            data,
            {headers: headers}
        ).then((resp) => {
            console.log(resp.data)
        }).catch((error) => {
            console.log(error)
            navigator("/login")
        })
    }, [])

    function changeUserInfo() {
        axios.post(
            `${process.env.REACT_APP_API_URL}/api/change-userinfo/`
        )
        setEditStatus(false)
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            position={'relative'}
            top={"-30px"}
            // bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                    {editStatus?
                        "ユーザー プロフィールの編集":
                        "ユーザー プロファイル"
                    }
                </Heading>
                <FormControl>
                    <FormLabel>ユーザーアイコン</FormLabel>
                    <Stack direction={['column', 'row']} spacing={6}>
                        <Center>
                            <Avatar size="xl" src={avatar}>
                                {editStatus&&
                                    <AvatarBadge
                                        as={IconButton}
                                        size="sm"
                                        rounded="full"
                                        top="-10px"
                                        colorScheme="red"
                                        aria-label="remove Image"
                                        icon={<SmallCloseIcon />}
                                    />
                                }
                            </Avatar>
                        </Center>
                        <Center w="full">
                            <Button w="full" isDisabled={!editStatus}>アイコンの変更</Button>
                        </Center>
                    </Stack>
                </FormControl>
                <FormControl isRequired={!editStatus ? false: true} isDisabled={!editStatus}>
                    <FormLabel>ユーザー名</FormLabel>
                    <Input
                        placeholder="ユーザー名"
                        autoComplete='off'
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={userName}
                        onChange={(e) => {setUserName(e.target.value)}}
                    />
                </FormControl>
                <FormControl isRequired={!editStatus ? false: true} isDisabled={!editStatus}>
                    <FormLabel>メールアドレス</FormLabel>
                    <Input
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => {setEamil(e.target.value)}}
                    />
                </FormControl>
                {editStatus&&
                    <>
                    <FormControl isRequired={!editStatus ? false: true} isDisabled={!editStatus}>
                        <FormLabel>以前のパスワード</FormLabel>
                        <Input
                            autoComplete="off"
                            placeholder="以前のパスワード"
                            _placeholder={{ color: 'gray.500' }}
                            type="password"
                            value={oldPsw}
                            onChange={(e) => {setOldPsw(e.target.value)}}
                        />
                    </FormControl>
                    <FormControl isRequired={!editStatus ? false: true} isDisabled={!editStatus}>
                        <FormLabel>新しいパスワード</FormLabel>
                        <Input
                            placeholder="新しいパスワード"
                            _placeholder={{ color: 'gray.500' }}
                            type="password"
                            value={newPsw}
                            onChange={(e) => {setNewPsw(e.target.value)}}
                        />
                    </FormControl>
                    <FormControl isRequired={!editStatus ? false: true} isDisabled={!editStatus}>
                        <FormLabel>新しいパスワードを再入力</FormLabel>
                        <Input
                            placeholder="新しいパスワードを再入力"
                            _placeholder={{ color: 'gray.500' }}
                            type="password"
                            value={reNewPsw}
                            onChange={(e) => {setReNewPsw(e.target.value)}}
                        />
                    </FormControl>
                    </>
                }
                <Stack spacing={6} direction={['column', 'row']}>
                    <Button
                        bg={'red.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'red.500',
                        }}
                        isDisabled={!editStatus}
                        onClick={() => {setEditStatus(false)}}
                    >
                        取消
                    </Button>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'blue.500',
                        }}
                        onClick={() => {
                            if(editStatus) {changeUserInfo()}
                            else setEditStatus(true)
                        }}
                    >
                        {editStatus?
                            "確認":
                            "編集"
                        }
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}