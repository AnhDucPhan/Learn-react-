import { useState } from 'react';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../../service/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../../redux/action/userAction';
import { ImSpinner9 } from "react-icons/im";

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoadingData, setLoadingData] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleLogin = async () => {
        // validate
        const isValidEmail = validateEmail(email)

        if (!isValidEmail) {
            toast.error('invalid email')
            return;
        }
        if (!password) {
            toast.error('invalid password');
            return;
        }
        setLoadingData(true);

        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(data.EM)
            setLoadingData(false)
            navigate('/')
        } if (data && data.EC !== 0) {
            toast.error(data.EM)
            setLoadingData(false)
        }
    }


    return (
        <div className="login-container">
            <div className='header'>
                <span>
                    Don't have an account yet?
                </span>
                <button onClick={() => { navigate('/register') }}>Sign Up</button>
            </div>
            <div className='title col-4 mx-auto'>AnhDuc</div>
            <div className='welcome col-4 mx-auto'>Hello, Who is this</div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type={'email'}
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type={'password'}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <span className='forgot-password'>forgot your password?</span>
                <div>
                    <button className='btn-login'
                        onClick={() => handleLogin()}
                        disabled={isLoadingData}>
                        {isLoadingData === true &&
                            <ImSpinner9 className="loader-icon" />}
                        <span>Login to my page</span></button>
                </div>
                <div className='back text-center'>
                    <span onClick={() => { navigate('/') }}>
                        &#60;&#60; Go back home
                    </span>
                </div>
            </div>

        </div>
    )
}

export default Login;