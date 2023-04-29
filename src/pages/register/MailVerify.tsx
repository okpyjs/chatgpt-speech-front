import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Flex,
    Box,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const EmailVerificationForm = () => {
    
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
            // let data = JSON.parse(resp.data)
            console.log("asdfasdf",resp, resp.data)
            localStorage.setItem("token", resp.data.access);
            console.log(resp);
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Box>
            <Flex justify={"center"} mb={5}>
                <Text mt={"40vh"}>We sent the verify code to your mail</Text>
            </Flex>
            <Flex justify={'center'}>
                <Input
                    type="number"
                    // placeholder="Enter your email"
                    // value={email}
                    onChange={(event) => setCode(event.target.value)}
                    width={"150px"}
                />
            </Flex>
            <Flex justify={'center'}>
                <Button type="submit" mt={4} color={"lightblue"} onClick={() => submitCode()}>
                    Verify
                </Button>
            </Flex>
                {/* {isSubmitted && (
                    <Text mt={4} color="green.500">
                        Verification email has been sent!
                    </Text>
                )} */}
        </Box>
    );
};

export default EmailVerificationForm;
