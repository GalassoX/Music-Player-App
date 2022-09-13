import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { LogoutIcon } from '@heroicons/react/outline';
import { IUser } from '../../interfaces/User';
import { getUser } from '../../api/users';
import { CogIcon, PencilIcon } from '@heroicons/react/outline';

const Account = () => {
    const [user, setUser] = useState<IUser>();
    const navigate = useNavigate();

    if (typeof window.localStorage.getItem('token') !== 'string') {
        navigate('/auth');
    }

    const onLogout = () => {
        if (window.localStorage.getItem('token') !== undefined) {
            window.localStorage.removeItem('token');
        }
        navigate('/auth');
        window.location.reload();
    }

    const toConfig = () => {
        navigate('/account/settings')
    }

    const showUser = async () => {
        const res = await getUser();
        if (!res) {
            onLogout();
            return;
        }
        setUser(res.data);
    }

    useEffect(() => {
        showUser();
    }, []);

    return (
        <div className='dark:text-slate-200'>
            <div className='flex items-center pb-2'>
                <button
                    onClick={toConfig}
                    className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 flex items-center gap-2"
                >
                    <CogIcon className='h-5 w-5' /> Opciones
                </button>
                <button
                    onClick={onLogout}
                    className='text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 flex items-center gap-2'
                >
                    Cerrar sesión<LogoutIcon className='h-5 w-5' />
                </button>
            </div>
            <hr />
            <div className='pt-2'>
                <h1 className='text-4xl'>Tu cuenta</h1>

                <div className='p-4'>
                    <div className='flex items-center gap-2'>
                        <p className='font-bold'>Usuario: </p><p>{user?.username}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className='font-bold'>Correo: </p><p>{user?.email}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className='font-bold'>Contraseña: </p><p><Link to="change-password" className='flex items-center text-blue-400 dark:text-blue-400 gap-1'>Cambiar<PencilIcon className='w-5 h-5' /></Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;
