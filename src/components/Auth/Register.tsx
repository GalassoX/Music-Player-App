import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationIcon } from '@heroicons/react/outline'
import { userRegister } from '../../api/users';
import { IUser } from '../../interfaces/User';

const Register = () => {

    const initialState = {
        username: '',
        email: '',
        password: ''
    };

    const navigate = useNavigate();

    const [newUser, setNewUser] = useState<IUser>(initialState);
    const [errors, setErrors] = useState<string[]>([]);

    const handlerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    const handlerRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await userRegister(newUser);
        if (!res.data.error) {
            window.localStorage.setItem('token', res.data.token);
            window.location.reload();
            navigate('/');
        } else {
            setErrors(res.data.error);
        }
    }

    return (
        <div className='block p-6 max-w-sm rounded-lg text-center'>

            {errors.length > 0 && errors.map(error =>
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 flex" role="alert">
                    <span className="font-medium"><ExclamationIcon className='h-5 w-5'></ExclamationIcon></span>{error}
                </div>
            )}

            <h5 className="mb-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Crea tu cuenta aquí!</h5>
            <form onSubmit={handlerRegisterSubmit}>
                <div className="mb-6">
                    <label htmlFor="regUsername" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ingresa un usuario</label>
                    <input type="text" id="regUsername" name='username' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500" onChange={handlerInputChange} required />
                </div>
                <div className="mb-6">
                    <label htmlFor="regEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ingresa un email</label>
                    <input type="email" id="regEmail" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500" onChange={handlerInputChange} required />
                </div>
                <div className="mb-6">
                    <label htmlFor="regPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contraseña</label>
                    <input type="password" id="regPassword" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500" onChange={handlerInputChange} required />
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="rememberRegister" aria-describedby="rememberRegister" type="checkbox" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="rememberRegister" className="font-medium text-gray-900 dark:text-gray-300">Recordarme</label>
                    </div>
                </div>
                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Crear cuenta</button>
            </form>
        </div>
    )
}

export default Register;
