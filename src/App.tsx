import * as React from "react"
import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    // theme
} from "@chakra-ui/react"
import { Logo } from "./Logo"

import theme from "./utils/theme"
import Navbar from "./layouts/navbar"
import { Router } from "./routes/router"

export const App = () => (
    <ChakraProvider theme={theme} >
        {/* <Navbar /> */}
        <Router />
    </ChakraProvider>
)
