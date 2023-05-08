import {
    Box,
    SimpleGrid,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    FormControl,
    FormLabel,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Image,
    Flex
} from '@chakra-ui/react'
import { SiHive, SiMarketo, SiMicrosoft } from 'react-icons/si'
import { PricingCard } from './PricingCard'
import { ActionButton } from './ActionButton'
import { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Plan = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [email, setEmail] = useState<string>("");
    const [payment, setPayment] = useState<string>("Paypal");
    const [paymentAddress, setPaymentAddress] = useState<string>("");
    const [amount, setAmount] = useState("30");
    const [unit, setUnit] = useState("¥")

    useEffect(() => {
        let email: any = localStorage.getItem("email")
        setEmail(email)
    }, [])

    function sendInvoice() {
        console.log(email, unit, amount, paymentAddress, payment)
        // onClose()
        let data = {
            email,
            unit,
            amount,
            paymentAddress,
            payment
        }
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.post(
            `${process.env.REACT_APP_API_URL}/api/stripe-invoce/`,
            data,
            config
        ).then((resp) => {
            console.log(resp.data)
        }).catch((error) => {
            // console.log(error.response.status)
            if(error.response.status == 401) navigate("/login")
            else console.log("server error")
        })
    }

    return (
        
        <Box
            as="section"
            // bg={useColorModeValue('gray.50', 'gray.800')}
            py="14"
            px={{ base: '4', md: '8' }}
            mt={"40px"}
        >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>プロプランのリクエスト</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* <Text>Could you enter to Pro plan</Text> */}
                        <FormControl isRequired={true} mt={5}>
                            <FormLabel>ユーザーメール</FormLabel>
                            <Input
                                placeholder="ユーザーメール"
                                autoComplete='off'
                                _placeholder={{ color: 'gray.500' }}
                                type="text"
                                value={email}
                                onChange={(e) => {setEmail(e.target.value)}}
                                // onChange={(e) => {setUserName(e.target.value)}}
                            />
                        </FormControl>
                        <Flex alignItems={'center'} mt={5}>
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                    お支払い方法を選択
                                </MenuButton>
                                <MenuList>
                                    <MenuItem minH='48px' onClick={() => setPayment("Paypal")}>
                                    <Image
                                        boxSize='2rem'
                                        borderRadius='full'
                                        src='https://placekitten.com/100/100'
                                        alt='Fluffybuns the destroyer'
                                        mr='12px'
                                    />
                                    <span>Paypal</span>
                                    </MenuItem>
                                    <MenuItem minH='40px' onClick={() =>setPayment("Payoneer")}>
                                    <Image
                                        boxSize='2rem'
                                        borderRadius='full'
                                        src='https://placekitten.com/120/120'
                                        alt='Simon the pensive'
                                        mr='12px'
                                    />
                                    <span>Payoneer</span>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            <Text ml={2}>{payment}</Text>
                        </Flex>
                        <FormControl isRequired={true} mt={5}>
                            <FormLabel>お支払いメール</FormLabel>
                            <Input
                                placeholder="お支払いメール"
                                autoComplete='off'
                                _placeholder={{ color: 'gray.500' }}
                                type="text"
                                value={paymentAddress}
                                onChange={(e) => {setPaymentAddress(e.target.value)}}
                                // onChange={(e) => {setUserName(e.target.value)}}
                            />
                        </FormControl>
                        
                        <Flex alignItems={'center'} mt={5}>
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                    単位
                                </MenuButton>
                                <MenuList>
                                    <MenuItem minH='48px' onClick={() => setUnit("¥")}>
                                    <Image
                                        boxSize='2rem'
                                        borderRadius='full'
                                        src='https://placekitten.com/100/100'
                                        alt='Fluffybuns the destroyer'
                                        mr='12px'
                                    />
                                    <span>¥</span>
                                    </MenuItem>
                                    <MenuItem minH='40px' onClick={() =>setUnit("$")}>
                                    <Image
                                        boxSize='2rem'
                                        borderRadius='full'
                                        src='https://placekitten.com/120/120'
                                        alt='Simon the pensive'
                                        mr='12px'
                                    />
                                    <span>$</span>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            <Text ml={2}>{unit}</Text>
                        </Flex>
                        <FormControl isRequired={true} mt={5}>
                            <FormLabel>金額</FormLabel>
                            <Input
                                placeholder="金額"
                                autoComplete='off'
                                _placeholder={{ color: 'gray.500' }}
                                type="number"
                                value={amount}
                                onChange={(e) => {setAmount(e.target.value)}}
                                // onChange={(e) => {setUserName(e.target.value)}}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' onClick={onClose}>Cancle</Button>
                        <Button colorScheme='blue' ml={3} onClick={() => sendInvoice()}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: '8', lg: '0' }}
                maxW="7xl"
                mx="auto"
                justifyItems="center"
                alignItems="center"
            >
                <PricingCard
                    data={{
                        price: '¥0',
                        name: '無料',
                        features: [
                            '1 日あたり 5 件のリクエスト',
                            // 'Lifetime access',
                            // 'Use on unlimited projects',
                            // 'Free Updates',
                        ],
                    }}
                    icon={SiMicrosoft}
                    button={
                        <ActionButton variant="outline" borderWidth="2px" disabled={true}>
                            今すぐ購入
                        </ActionButton>
                    }
                />
                <PricingCard
                    zIndex={1}
                    isPopular
                    // transform={{ lg: 'scale(1.05)' }}
                    data={{
                        price: '¥49',
                        name: 'プロ',
                        features: [
                            '1 日あたり200 件のリクエスト',
                            // 'Lifetime access',
                            // 'Use on unlimited projects',
                            // 'Use on unlimited projects',
                            // 'Free Updates',
                        ],
                    }}
                    icon={SiHive}
                    button={<ActionButton onClick={onOpen}>今すぐ購入</ActionButton>}
                />
                {/* <PricingCard
                    data={{
                    price: '$29',
                    name: 'Marketing UI',
                    features: [
                        // 'All application UI components',
                        // 'Lifetime access',
                        // 'Use on unlimited projects',
                        // 'Free Updates',
                    ],
                    }}
                    icon={SiMarketo}
                    button={
                    <ActionButton variant="outline" borderWidth="2px">
                        今すぐ購入
                    </ActionButton>
                    }
                /> */}
            </SimpleGrid>
        </Box>
    )
}
