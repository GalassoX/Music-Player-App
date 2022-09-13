import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { IUser } from '../../interfaces/User';
import Login from './Login';
import Register from './Register';

const Auth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof window.localStorage.getItem('token') === 'string') {
            navigate('/account');
        }
    }, []);

    return (
        <div className='flex flex-row items-center'>
            <div className="basis-1/2 m-4">
                <Register />
            </div>
            <div className="basis-1/2 m-4">
                <Login />
            </div>
        </div>
    )
}

export default Auth;
