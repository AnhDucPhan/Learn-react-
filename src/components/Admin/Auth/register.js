import { useState } from 'react';
import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { postRegister } from '../../../service/apiService';
import { toast } from 'react-toastify';
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const Register = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('')
    const [isShowHidePassword, setShowHidePassword] = useState(false)
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleCreateAccountUser = async () => {
        //validate
        const isValidEmail = validateEmail(email)

        if (!isValidEmail) {
            toast.error('invalid email')
            return;
        }
        if (!password) {
            toast.error('invalid password');
            return;
        }

        let data = await postRegister(email, password, username);
        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate('/login')
        } if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }


    return (
        <div className="register-container">
            <div className='header'>
                <span>
                    Already have an account?
                </span>
                <button onClick={() => { navigate('/login') }}>Log In</button>
            </div>
            <div className='title col-4 mx-auto'>AnhDuc & Friends</div>
            <div className='welcome col-4 mx-auto'>Start your journey?</div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email(*)</label>
                    <input
                        type={'email'}
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className='form-group pass-group'>
                    <label>Password(*)</label>
                    <input
                        type={isShowHidePassword ? 'text' : 'password'}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                    {isShowHidePassword ?
                        <span className='icon-eye'
                            onClick={() => setShowHidePassword(false)}>
                            <FaEyeSlash />
                        </span>
                        :
                        <span className='icon-eye' onClick={() => setShowHidePassword(true)}>
                            <IoEyeSharp />
                        </span>
                    }

                </div>
                <div className='form-group'>
                    <label>Username</label>
                    <input
                        type={Text}
                        className='form-control'
                        value={username}
                        onChange={(event) => setUserName(event.target.value)} />
                </div>
                <span className='forgot-password'>forgot your password?</span>
                <div>
                    <button className='btn-login'
                        onClick={() => handleCreateAccountUser()}>Create my free account</button>
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

export default Register;