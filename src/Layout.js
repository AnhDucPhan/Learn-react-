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
import ListQuiz from './components/User/listQuiz';
import DetailQuiz from './components/User/detailQuiz';
import ManageQuiz from './components/Admin/Quiz/manageQuiz';
import Questions from './components/Admin/Content/Question/questions';

const NotFound = () => {
    return (
        <div className='container mt-3 alert alert-danger'>
            Not Found Your URL ERROR 404
        </div>
    )
}


const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='user' element={<ListQuiz />} />
                </Route>
                <Route path='/quiz/:id' element={<DetailQuiz />} />
                <Route path='/admins' element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path='manage-users' element={<UserManage />} />
                    <Route path='manage-quizzes' element={<ManageQuiz />} />
                    <Route path='manage-questions' element={<Questions />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<NotFound />} />
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