import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationIcon } from '@heroicons/react/outline'
import { userLogin } from '../../api/users';
import { IUser } from '../../interfaces/User';

const Login = () => {

    const initialState = {
        username: '',
        password: ''
    };

    const navigate = useNavigate();

    const [user, setUser] = useState<IUser>(initialState);
    const [errors, setErrors] = useState<string[]>([]);

    const handlerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handlerLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors([]);
        const res = await userLogin(user);
        if (!res) {
            setErrors(['El usuario y la contraseña no coinciden']);
        } else {
            window.localStorage.setItem('token', res.data.token);
            window.location.reload();
            navigate('/');
        }
    }

    return (
        <div className='block p-6 max-w-sm rounded-lg text-center'>

            {errors.length > 0 && errors.map(error =>
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 flex" role="alert">
                    <span className="font-medium"><ExclamationIcon className='h-5 w-5'></ExclamationIcon></span>{error}
                </div>
            )}

            <h5 className="mb-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ingresar con tu cuenta aquí!</h5>
            <form onSubmit={handlerLoginSubmit}>
                <div className="mb-6">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ingresa tu usuario</label>
                    <input type="text" id="username" name='username' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500" onChange={handlerInputChange} required />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contraseña</label>
                    <input type="password" id="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500" onChange={handlerInputChange} required />
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="rememberLogin" aria-describedby="rememberLogin" type="checkbox" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="rememberLogin" className="font-medium text-gray-900 dark:text-gray-300">Recordarme</label>
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ingresar</button>
            </form>

        </div>
    )
}

export default Login;
