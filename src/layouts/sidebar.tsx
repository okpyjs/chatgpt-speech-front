import React, { ReactNode } from 'react';
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuGroup,
    Button,
    MenuDivider,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import {
    FiHome,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { FaLanguage, FaSchool, FaCertificate } from 'react-icons/fa';
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Mode from '../pages/home/mode';
import { useNavigate } from 'react-router-dom'


interface LinkItemProps {
    name: string;
    icon: IconType;
    link: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'ホーム', icon: FiHome, link: "/" },
    { name: '学校の勉強', icon: FaSchool, link: "/school" },
    { name: '語学', icon: FaLanguage, link: "/language" },
    // { name: 'お気に入り', icon: FiStar },
    { name: '資格', icon: FaCertificate, link: "/certificate" },
];

export default function SidebarWithHeader(
    {
        children,
        name,
    }: {
        children: ReactNode;
        name: string;
    }
) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                name={name}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} name={name}/>
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} name = {name}/>
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
    name: string;
}

const SidebarContent = ({ onClose, name, ...rest }: SidebarProps) => {
    const navigate = useNavigate()

    function signOut() {
        localStorage.removeItem("token")
        navigate("/login", { replace: true})
    }

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Parakeet
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} link={link.link}>
                    {link.name}
                </NavItem>
            ))}
            <Flex alignItems={'center'} pos={'absolute'} bottom={2} left={5}>
                <Menu>
                    <MenuButton
                        py={2}
                        transition="all 0.3s"
                        _focus={{ boxShadow: 'none' }}>
                        <HStack>
                            <Avatar
                                size={'sm'}
                                src={
                                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                }
                            />
                            <VStack
                                display={{ base: 'none', md: 'flex' }}
                                alignItems="flex-start"
                                spacing="1px"
                                ml="2">
                                <Text fontSize="sm">白石雅之</Text>
                                <Text fontSize="xs" color="gray.600">
                                    管理者
                                </Text>
                            </VStack>
                            <Box display={{ base: 'none', md: 'flex' }}>
                                <FiChevronDown />
                            </Box>
                        </HStack>
                    </MenuButton>
                    <MenuList
                        //   bg={useColorModeValue('white', 'gray.900')}
                        //   borderColor={useColorModeValue('gray.200', 'gray.700')}
                    >
                        <MenuItem>プロフィール</MenuItem>
                        <MenuItem>設定</MenuItem>
                        <MenuItem>請求する</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={() => {signOut()}}>サインアウト</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
    link: string;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    const navigate = useNavigate()

    function handleClick(e: any, link: string) {
        e.preventDefault();
        console.log(link)
        navigate(link, { replace: true})
    }

    return (
        <Link onClick={(e) => {handleClick(e, rest.link)}} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
    name: string;
}
const MobileNav = ({onOpen, name, ...rest }: MobileProps) => {
    return (
        <>
        {name == "home" &&
            <Box display={{ base: 'none', md: 'flex' }} pos={'absolute'} left={"40%"} top={5}>
                <Mode category='chat'></Mode>
                <Mode category='audio'></Mode>
            </Box>
        }
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Parakeet
            </Text>
            <HStack spacing={{ base: '0', md: '3' }}>
                <ColorModeSwitcher/>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell />}
                />
            </HStack>
        </Flex>
        </>
    );
};