
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
import { Plan } from '../pages/plan';
import UserProfileEdit from '../pages/user';

export const Router = () => (
    <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<SidebarWithHeader children={<Home />} name="home"/>}/>
            <Route path="/home" element={<Navigate to={"/"}/>}/>
            <Route path="/login" element={<Login name="login"/>}></Route>
            <Route path="/signup" element={<Login name="signup"/>}></Route>
            <Route path="/mail-verify" element={<EmailVerificationForm />}></Route>
            <Route path="/school" element={<SidebarWithHeader children={"School"} name="school"/>}></Route>
            <Route path="/language" element={<SidebarWithHeader children={"Language"} name="language"/>}></Route>
            <Route path="/certificate" element={<SidebarWithHeader children={"Certificate"} name="certificate"/>}></Route>
            <Route path="/profile" element={<SidebarWithHeader children={<UserProfileEdit/>} name="profile"/>}></Route>
            <Route path="/setting" element={<SidebarWithHeader children={"Setting"} name="certificate"/>}></Route>
            <Route path="/plan" element={<SidebarWithHeader children={<Plan />} name="plan"/>}></Route>
            {/* <Route path="*" element={<Navigate to={"/"}/>}></Route> */}
        </Routes>
    </BrowserRouter>
)