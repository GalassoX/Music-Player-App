import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, LoginIcon } from '@heroicons/react/outline';
import { BsMusicNoteList } from 'react-icons/bs';

const Sidebar = () => {

    const [isAuth, setIsAuth] = useState(Boolean);

    useEffect(() => {
        setIsAuth(typeof window.localStorage.getItem('token') === 'string');
    }, [window.localStorage.getItem('token')]);

    return (
        <div className="bg-gray-200 text-gray-900 w-64 space-y-6 dark:bg-neutral-900 dark:text-slate-200 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out" id='sidebar'>
            <nav>
                <Link to="/" className="py-2.5 px-4 flex items-center space-x-2 rounded transition duration-200 hover:bg-neutral-700 gap-2">
                    <HomeIcon className='w-5 h-5'></HomeIcon> Inicio
                </Link>
                { /* <Link to="/search" className="py-2.5 px-4 flex items-center space-x-2 rounded transition duration-200 hover:bg-neutral-700 gap-2">
                    <SearchIcon className='w-5 h-5'></SearchIcon> Buscar
                </Link> */ }
                <Link to="playlists" className="py-2.5 px-4 flex items-center space-x-2 rounded transition duration-200 hover:bg-neutral-700 gap-2">
                    <BsMusicNoteList className='w-5 h-5'></BsMusicNoteList> Playlists
                </Link>
                {
                    isAuth ?
                        <Link to="/account" className="py-2.5 px-4 flex items-center space-x-2 rounded transition duration-200 hover:bg-neutral-700 gap-2">
                            <UserIcon className='w-5 h-5'></UserIcon> Cuenta
                        </Link>
                        :
                        <Link to="/auth" className="py-2.5 px-4 flex items-center space-x-2 rounded transition duration-200 hover:bg-neutral-700 gap-2">
                            <LoginIcon className='w-5 h-5'></LoginIcon> Ingresar
                        </Link>
                }
            </nav>
        </div>
    )
}

export default Sidebar;
