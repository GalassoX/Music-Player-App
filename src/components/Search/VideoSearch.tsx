import React, { ChangeEvent, FormEvent, useState } from 'react';
import { IVideo } from '../../interfaces/Video';
import { searchVideos } from '../../api/videos';
import VideoItem from './VideoItem';

interface Props {
    //onVideosChange: IVideo;
    startSong: (video: IVideo) => void;
    addToQueue: (video: IVideo) => void;
}

const VideoSearch = ({ startSong, addToQueue }: Props) => {

    const [search, setSearch] = useState('');
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const res = await searchVideos(search);
        setVideos(res.data);
        setLoading(false);
    }

    return (
        <div className='mb-20'>
            <form onSubmit={handleSubmit}>
                <div className="mb-6 flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-neutral-600 dark:text-white dark:border-neutral-600">
                        {
                            loading ? (
                                <svg role="status" className="inline h-6 w-6 animate-spin mr-2 text-gray-200 dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            ) : (
                                <p className='h-6 w-6'>🔍</p>
                            )
                        }
                    </span>
                    <input
                        type="text"
                        name="search_query"
                        id="songSearch"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 5 dark:bg-neutral-700 dark:border-neutral-700 dark:placeholder-gray-300 dark:text-white dark:focus:ring-neutral-800 dark:focus:border-neutral-900"
                        placeholder='Buscar'
                        onChange={handleInputChange}
                    />
                </div>
            </form>
            {videos.map(video => (
                <VideoItem video={video} playSong={startSong} addQueue={addToQueue} key={video.id} />
            ))}
        </div>
    )
}

export default VideoSearch;
