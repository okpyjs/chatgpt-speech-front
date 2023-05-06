import React, { useState } from 'react';
import { Center, Heading } from '@chakra-ui/react';
import {
    Button,
    FormControl,
    Flex,
    Link,
    Stack,
    useColorModeValue,
    HStack,
} from '@chakra-ui/react';
import { PinInput, PinInputField, useToast } from '@chakra-ui/react';
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";


export default function EmailVerificationForm(): JSX.Element {
    const navigator = useNavigate()
    const toast = useToast()
    
    const email = useSelector((state: RootState) => state.userInfo.email)
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // handle email verification logic here
        setIsSubmitted(true);
    };

    const submitCode = () => {
        console.log(email)
        let code: string = ""
        for(let i = 0; i < 6; i ++){
            let input: any = document.querySelector(`#verify_code-${i}`)
            code += input.value
        }
        if(code.length < 6) {
            toast({
                title: '正しいコードを入力',
                // description: "We've created your account for you.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        console.log(code)
        axios.post(
            `${process.env.REACT_APP_API_URL}/api/mail-verify/`,
            {
                code: code,
                email: email,
            }
        ).then((resp) => {
            navigator("/login")
            toast({
                title: 'メール確認済み',
                // description: "We've created your account for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }).catch((error) => {
            console.log(error)
            toast({
                title: 'コードエラー',
                // description: "We've created your account for you.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        })
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'sm'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={10}>
                <Center>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                        メールアドレスの認証
                    </Heading>
                </Center>
                <Center
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color={useColorModeValue('gray.800', 'gray.400')}>
                    あなたのメールにコードを送信しました
                </Center>
                <Center
                    fontSize={{ base: 'sm', sm: 'md' }}
                    fontWeight="bold"
                    color={useColorModeValue('gray.800', 'gray.400')}>
                    {email}
                </Center>
                <FormControl>
                    <Center>
                        <HStack>
                            <PinInput id='verify_code'>
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                    </Center>
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                        onClick={() => { submitCode() }}
                    >
                        ベリファイ
                    </Button>
                </Stack>
                <Stack spacing={6} align={'center'}>
                    <Link>再送</Link>
                </Stack>
            </Stack>
        </Flex>
    );
}