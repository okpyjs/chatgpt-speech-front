
import {
    BrowserRouter,
    Routes,
    Route,
    Link as RouteLink
} from 'react-router-dom';

import Home from "../pages/home"
import SidebarWithHeader from "../layouts/sidebar";

export const Router = () => (
    <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<SidebarWithHeader children={<Home />}/>}/>
        </Routes>
    </BrowserRouter>
)