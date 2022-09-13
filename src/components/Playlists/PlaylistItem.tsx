import IPlaylist from '../../interfaces/Playlist';
import { PlayIcon, TrashIcon } from '@heroicons/react/outline';
import { deletePlaylist } from '../../api/playlist';
import { Link } from 'react-router-dom';

interface Props {
    playlist: IPlaylist;
    setPlaylists: (playlists: IPlaylist[]) => void;
    runPlaylist: (playlist: IPlaylist) => void;
}

const PlaylistItem = ({ playlist, setPlaylists, runPlaylist }: Props) => {

    const delPlaylist = async (playlist: IPlaylist) => {
        const { data } = await deletePlaylist(playlist);
        if (data.playlists === undefined) return;
        setPlaylists(data.playlists);
    }

    const playPlaylist = (playlist: IPlaylist) => {
        runPlaylist(playlist);
    }

    return (
        <div className="block p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-neutral-900 dark:border-neutral-700 mb-2">
            <Link to={"" + playlist._id}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{playlist.name}</h5>
            </Link>
            <div className="pt-5 flex">
                <button
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex items-center gap-1"
                    onClick={() => playPlaylist(playlist)}
                >
                    <PlayIcon className='h-5 w-5'></PlayIcon> Reproducir lista
                </button>
                <button
                    type="button"
                    className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex items-center"
                    onClick={() => delPlaylist(playlist)}
                >
                    <TrashIcon className='h-5 w-5' />
                </button>
            </div>
        </div>
    );
};

export default PlaylistItem;
