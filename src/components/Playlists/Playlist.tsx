import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteSongPlaylist, getPlaylist } from '../../api/playlist';
import IPlaylist, { IPlaylistSong } from '../../interfaces/Playlist';

const Playlist = () => {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState<IPlaylist>();

    const getList = async (id: string) => {
        const res = await getPlaylist(id);
        setPlaylist(res);
    }

    useEffect(() => {
        getList(id as string);
    }, []);

    const deleteSongToPlaylist = async (song: IPlaylistSong) => {
        if (playlist === undefined) return;
        const list = await deleteSongPlaylist(playlist, song);
        setPlaylist(list);
    }

    return (
        <div className="flex flex-col text-neutral-800 dark:text-slate-200">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg">
                        <h3 className='font-semibold text-2xl pb-5'>{playlist?.name}</h3>
                        {
                            (playlist?.songs.length as number) > 0 ? (
                                <table className="min-w-full">
                                    <tbody>
                                        {playlist?.songs.map(song => (
                                            <tr className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700">
                                                <td className="py-4 px-6 text-sm font-medium whitespace-nowrap">
                                                    {song.name}
                                                </td>
                                                <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                                    <p
                                                        className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:underline"
                                                        onClick={() => deleteSongToPlaylist(song)}
                                                    >Eliminar</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No hay canciones en esta playlist.</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Playlist;
