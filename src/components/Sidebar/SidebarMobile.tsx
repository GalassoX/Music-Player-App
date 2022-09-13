import React from 'react'
import { Link } from 'react-router-dom';
import { ViewListIcon } from '@heroicons/react/outline';

const SidebarMobile = () => {
    return (
        <div className="bg-neutral-900 text-gray-100 flex justify-between md:hidden">
            <Link to="/" className="block p-4 text-white font-bold">App Music React</Link>
            <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700" onClick={() => {
                    const sidebar = document.getElementById('sidebar');
                    sidebar?.classList.toggle('-translate-x-full');
                } }>
                <ViewListIcon className='h-5 w-5'></ViewListIcon>
            </button>
        </div>
    )
}

export default SidebarMobile
