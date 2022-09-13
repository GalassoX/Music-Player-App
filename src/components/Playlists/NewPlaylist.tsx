import { useEffect, useState, Fragment, ChangeEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon, ExclamationIcon } from '@heroicons/react/solid';
import { createPlaylist } from '../../api/playlist';
import IPlaylist from '../../interfaces/Playlist';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    setPlaylists: (playlists: IPlaylist[]) => void;
}

const NewPlaylist = ({ open, setOpen, setPlaylists }: Props) => {
    const [isOpen, setIsOpen] = useState(open);
    const [errors, setErrors] = useState<string[]>([]);
    const [playlistName, setPlaylistName] = useState<string>();

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    function closeModal() {
        setIsOpen(false)
        setOpen(false);
    }

    const handlerNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPlaylistName(e.target.value);
    }

    const createNewPlaylist = async () => {
        if (playlistName === undefined || playlistName.length <= 0) {
            setErrors(["Tienes que introducir un nombre"]);
            console.log('Error');
            return;
        }
        closeModal();
        const res = await createPlaylist({ name: playlistName, songs: [] });
        if (res.data.playlists === undefined) return;
        setPlaylists(res.data.playlists);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-neutral-700">

                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-200"
                            >
                                Crear una playlist
                            </Dialog.Title>
                            <div className="mt-2">
                                {errors.length > 0 && errors.map((error) => (
                                    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 flex" role="alert">
                                        <span className="font-medium"><ExclamationIcon className='h-5 w-5'></ExclamationIcon></span>{error}
                                    </div>
                                ))}
                                <div>
                                    <label htmlFor='namePlaylist' className='block mb-2 text-sm font-medium text-gray-900 dark:text-slate-200'>Nombre de la Playlist</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="namePlaylist"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-600 dark:border-neutral-500 dark:text-slate-200"
                                        required
                                        onChange={handlerNameChange}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-2 justify-between">
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-slate-200 bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={createNewPlaylist}
                                >
                                    Crear!
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-slate-200 bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={closeModal}
                                >
                                    <XIcon className='w-5 h-5' />Cerrar
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog >
        </Transition >
    );
};

export default NewPlaylist;
