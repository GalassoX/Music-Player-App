import { useEffect, useState } from 'react'
import { getUser } from '../../api/users';
import IPlaylist from '../../interfaces/Playlist';
import PlaylistItem from './PlaylistItem';
import { BsPlus } from 'react-icons/bs';
import NewPlaylist from './NewPlaylist';
import { IVideo } from '../../interfaces/Video';
import { searchVideos } from '../../api/videos';

interface Props {
    runPlaylist: (videos: IVideo[]) => void;
}

const Playlists = ({ runPlaylist }: Props) => {
    const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
    const [showNewPlaylist, setShowNewPlaylist] = useState(false);

    const showPlaylists = async () => {
        const { data } = await getUser();
        if (data.playlists === undefined) return;
        setPlaylists(data.playlists);
    };

    useEffect(() => {
        showPlaylists();
    }, []);

    const showModalNewPlaylist = () => {
        setShowNewPlaylist(true);
    }

    const playlistToVideo = async (playlist: IPlaylist) => {
        let videos: IVideo[] = [];
        await playlist.songs.forEach(async (song) => {
            const res = await searchVideos(song.video_id);
            videos.push(res.data[0]);
            runPlaylist(videos);
        })
    }

    return (
        <div>
            <div>
                <button
                    type="button"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex items-center "
                    onClick={showModalNewPlaylist}
                >
                    <BsPlus className='h-5 w-5' /> Crear playlist
                </button>
            </div>
            <div>
                {playlists.map(playlist => (
                    <PlaylistItem playlist={playlist} setPlaylists={setPlaylists} runPlaylist={playlistToVideo} key={playlist._id} />
                ))}
            </div>
            <NewPlaylist open={showNewPlaylist} setOpen={setShowNewPlaylist} setPlaylists={setPlaylists} />
        </div>
    )
}

export default Playlists;
