
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

import Home from "../pages/home"
import SidebarWithHeader from "../layouts/sidebar";
import Login from '../pages/register/Login';
import EmailVerificationForm from '../pages/register/MailVerify';

export const Router = () => (
    <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<SidebarWithHeader children={<Home />} name="home"/>}/>
            <Route path="/home" element={<Navigate to={"/"}/>}/>
            <Route path="/login" element={<Login name="login"/>}></Route>
            <Route path="/signup" element={<Login name="signup"/>}></Route>
            <Route path="/mail-verify" element={<EmailVerificationForm />}></Route>
        </Routes>
    </BrowserRouter>
)