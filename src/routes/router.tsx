
import {
    BrowserRouter,
    Routes,
    Route,
    Link as RouteLink
} from 'react-router-dom';

import Home from "../pages/home"
import SidebarWithHeader from "../layouts/sidebar";
import Login from '../pages/register/Login';

export const Router = () => (
    <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<SidebarWithHeader children={<Home />} name="home"/>}/>
            <Route path="/login" element={<Login name="login"/>}></Route>
            <Route path="/signup" element={<Login name="signup"/>}></Route>
        </Routes>
    </BrowserRouter>
)