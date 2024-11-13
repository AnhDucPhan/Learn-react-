import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import User from './components/User/user';
import Admin from './components/Admin/admin';
import HomePage from './components/Home/homepage';
import UserManage from './components/Admin/Content/userManage';
import Dashboard from './components/Admin/Content/dashboard';
import Login from './components/Admin/Auth/login';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Admin/Auth/register';




const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='users' element={<User />} />
                </Route>
                <Route path='/admins' element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path='manage-users' element={<UserManage />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    )
}

export default Layout;