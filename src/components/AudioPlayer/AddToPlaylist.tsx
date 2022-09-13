import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import IPlaylist from '../../interfaces/Playlist';
import { getUser } from '../../api/users';
import { IVideo } from '../../interfaces/Video';
import { updatePlaylist } from '../../api/playlist';

interface Props {
    open: boolean;
    song: IVideo | undefined;
    setOpen: (open: boolean) => void;
    //setPlaylists: (playlists: IPlaylist[]) => void;
}

const AddToPlaylist = ({ open, song, setOpen }: Props) => {
    const [isOpen, setIsOpen] = useState(open);
    const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

    async function updatePlaylists() {
        const { data } = await getUser();
        if (data.playlists === undefined) return;
        setPlaylists(data.playlists);
    }

    useEffect(() => {
        setIsOpen(open);
        updatePlaylists();
    }, [open]);

    function closeModal() {
        setIsOpen(false)
        setOpen(false);
    }

    async function addPlaylist(playlist: IPlaylist) {
        if (song === undefined) return;
        playlist.songs.push({ name: song.title, video_id: song.id });
        await updatePlaylist(playlist);
        closeModal();
    }

    return (
        <>
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
                                    Selecciona la playlist a la que quieres agregar esta canción
                                </Dialog.Title>
                                <div className="mt-2">
                                    {playlists.map((list) => (
                                        <div
                                            className="block p-2 px-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-neutral-800 hover:bg-neutral-900 hover:cursor-pointer dark:border-neutral-700 mb-2"
                                            onClick={() => addPlaylist(list)}
                                            key={list._id}
                                        >
                                            <h5 className="m-1 tracking-tight text-gray-900 dark:text-white">{list.name}</h5>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 flex items-center gap-2 justify-between">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-slate-200 bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog >
            </Transition >
        </ >
    );
};

export default AddToPlaylist;
