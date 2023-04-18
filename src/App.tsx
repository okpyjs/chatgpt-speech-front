import * as React from "react"
import { Provider } from "react-redux"
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
import { store } from "./redux/store"

export const App = () => (
    <Provider store={store}>
        <ChakraProvider theme={theme} >
            {/* <Navbar /> */}
            <Router />
        </ChakraProvider>
    </Provider>
)
