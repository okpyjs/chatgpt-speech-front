import React, { useState } from 'react';
import { Center, Heading } from '@chakra-ui/react';
import {
    Button,
    FormControl,
    Flex,
    Input,
    Stack,
    useColorModeValue,
    HStack,
} from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";


export default function EmailVerificationForm(): JSX.Element {
    const navigator = useNavigate()
    
    const email = useSelector((state: RootState) => state.userInfo.email)
    const [code, setCode] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // handle email verification logic here
        setIsSubmitted(true);
    };

    const submitCode = () => {
        console.log(email)
        axios.post(
            `${process.env.REACT_APP_API_URL}/api/mail-verify/`,
            {
                code: code,
                email: email,
            }
        ).then((resp) => {
            navigator("/login")
        }).catch((error) => {
            console.log(error)
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
                        Verify your Email
                    </Heading>
                </Center>
                <Center
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color={useColorModeValue('gray.800', 'gray.400')}>
                    We have sent code to your email
                </Center>
                <Center
                    fontSize={{ base: 'sm', sm: 'md' }}
                    fontWeight="bold"
                    color={useColorModeValue('gray.800', 'gray.400')}>
                    username@mail.com
                </Center>
                <FormControl>
                    <Center>
                        <HStack>
                            <PinInput>
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
                        }}>
                        Verify
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}