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
import { useState } from 'react';


export default function UserProfileEdit(): JSX.Element {

    const [editStatus, setEditStatus] = useState<boolean>(false)

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
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
                        "User Profile Edit":
                        "User Profile"
                    }
                </Heading>
                <FormControl id="avatar">
                    <FormLabel>User Icon</FormLabel>
                    <Stack direction={['column', 'row']} spacing={6}>
                        <Center>
                            <Avatar size="xl" src="https://static.deepl.com/img/logo/DeepL_Logo_darkBlue_v2.svg">
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
                            <Button w="full" isDisabled={!editStatus}>Change Icon</Button>
                        </Center>
                    </Stack>
                </FormControl>
                <FormControl id="userName" isRequired={!editStatus ? false: true} isDisabled={!editStatus}>
                    <FormLabel>User name</FormLabel>
                    <Input
                        placeholder="UserName"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                    />
                </FormControl>
                <FormControl id="email" isRequired={!editStatus ? false: true} isDisabled={!editStatus}>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                    />
                </FormControl>
                <FormControl id="old_password" isRequired={!editStatus ? false: true} isDisabled={!editStatus}>
                    <FormLabel>Old Password</FormLabel>
                    <Input
                        placeholder="password"
                        _placeholder={{ color: 'gray.500' }}
                        type="password"
                    />
                </FormControl>
                {editStatus&&
                    <>
                    <FormControl id="new_password" isRequired={!editStatus ? false: true} isDisabled={!editStatus}>
                        <FormLabel>New Password</FormLabel>
                        <Input
                            placeholder="password"
                            _placeholder={{ color: 'gray.500' }}
                            type="password"
                        />
                    </FormControl>
                    <FormControl id="re_password" isRequired={!editStatus ? false: true} isDisabled={!editStatus}>
                        <FormLabel>New Password Again</FormLabel>
                        <Input
                            placeholder="password"
                            _placeholder={{ color: 'gray.500' }}
                            type="password"
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
                        Cancel
                    </Button>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'blue.500',
                        }}
                        onClick={() => {
                            if(editStatus) setEditStatus(false)
                            else setEditStatus(true)
                        }}
                    >
                        {editStatus?
                            "Confirm":
                            "Edit"
                        }
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}