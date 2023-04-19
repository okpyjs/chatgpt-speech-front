import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    Flex,
    // Link,
} from '@chakra-ui/react'
import { Logo } from './Logo'
import OAuthButtonGroup from './OAuthButtonGroup'
import { PasswordField } from './PasswordField'
import { Link } from 'react-router-dom'

export default function Login({name}: {name: string}) {
    return(
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
            <Stack spacing="6">
                {/* <Logo /> */}
                <Flex justify={'center'}>
                    <Text fontSize={30} fontWeight={700} letterSpacing={3}>Parakeet</Text>
                </Flex>
                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                    {name == "login"?(
                        <>
                        <Heading size={{ base: 'xs', md: 'sm' }}>あなたのアカウントにログイン</Heading>
                        <HStack spacing="1" justify="center">
                            <Text color="muted">アカウントを持っていませんか? &nbsp; </Text>
                            <Button variant="link" colorScheme="blue">
                                <Link to='/signup'>サインアップ</Link>
                            </Button>
                        </HStack>
                        </>
                    ): (
                        <>
                        <Heading size={{ base: 'xs', md: 'sm' }}>アカウントを作成する</Heading>
                        <HStack spacing="1" justify="center">
                            <Text color="muted">すでにアカウントをお持ちですか？ &nbsp; </Text>
                            <Button variant="link" colorScheme="blue">
                                <Link to='/login'>ログイン</Link>
                            </Button>
                        </HStack>
                        </>
                    )
                    }
                </Stack>
            </Stack>
            <Box
                py={{ base: '0', sm: '8' }}
                px={{ base: '4', sm: '10' }}
                bg={{ base: 'transparent', sm: 'bg-surface' }}
                boxShadow={{ base: 'none', sm: 'md' }}
                borderRadius={{ base: 'none', sm: 'xl' }}
            >
                <Stack spacing="6">
                    <Stack spacing="5">
                        <FormControl>
                            <FormLabel htmlFor="email">メール</FormLabel>
                            <Input id="email" type="email" />
                        </FormControl>
                        <PasswordField name = {name}/>
                    </Stack>
                    {name == "login" &&
                        <HStack justify="space-between">
                            <Checkbox defaultChecked><Text fontSize={13}>私を覚えておいてください</Text></Checkbox>
                            <Button variant="link" colorScheme="blue" size="sm" fontSize={12}>
                                パスワードをお忘れですか？
                            </Button>
                        </HStack>
                    }
                    <Stack spacing="6">
                        {
                            name=="login"? (
                                    <Button>ログイン</Button>
                                ): (
                                    <Button>サインアップ</Button>
                                )
                        }
                        <HStack>
                            <Divider />
                            <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                                または
                            </Text>
                            <Divider />
                        </HStack>
                        <OAuthButtonGroup />
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    </Container>
)}