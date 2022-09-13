import React, { useEffect, useState } from 'react'
import { IVideo } from '../../interfaces/Video'
import { ClockIcon, PlayIcon, PlusSmIcon } from '@heroicons/react/outline';

interface Props {
    video: IVideo;
    playSong: (video: IVideo) => void;
    addQueue: (video: IVideo) => void;
}

const VideoItem = ({ video, playSong, addQueue }: Props) => {
    /*const [audio, setAudio] = useState(new Audio());
    const [playing, setPlaying] = useState(false);*/

    /*const playAudio = async (youtube_id: string) => {
        const res = await getAudioURL(youtube_id);
        const audio = new Audio(res.data.url);
        setAudio(audio);
        audio.play();
        setPlaying(true);
    }*/

    const playAudio = async (video: IVideo) => {
        /*const res = await getAudioURL(youtube_id);
        const audio = new Audio(res.data.url);
        setAudio(audio);
        audio.play();
        setPlaying(true);*/
        playSong(video);
    }

    /*useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing]);*/

    /*useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.addEventListener('ended', () => setPlaying(false));
        }
    }, []);*/

    return (
        <>
            <div className="flex flex-col items-center bg-slate-200 rounded-lg border shadow-md md:flex-row dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-gray-700 mb-1">
                <img className="object-cover w-full h-auto rounded-lg md:h-auto md:w-48 md:rounded-lg mx-2" src={video.metadata.thumbnails[0].url} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{video.title}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400 flex items-center gap-2">{video.author} ~<ClockIcon className='h-5 w-5 space-x-2'></ClockIcon> {video.metadata.duration.simple_text}</p>
                    <div className="pt-5 flex">
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex items-center gap-1"
                            onClick={() => {
                                playAudio(video);
                            }}
                        >
                            <PlayIcon className='h-5 w-5'></PlayIcon> Reproducir
                        </button>
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex items-center"
                            onClick={() => {
                                addQueue(video)
                            }}
                        >
                            <PlusSmIcon className='h-5 w-5'></PlusSmIcon> Añadir a la cola
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoItem;
/*<div className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-neutral-900 dark:border-neutral-700 mb-1">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{video.title}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 flex items-center gap-2">{video.author} ~<ClockIcon className='h-5 w-5 space-x-2'></ClockIcon> {video.metadata.duration.simple_text}</p>
            <div className="pt-5 flex">
                <button
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex items-center gap-1"
                    onClick={() => {
                        playAudio(video);
                    }}
                >
                    <PlayIcon className='h-5 w-5'></PlayIcon> Reproducir
                </button>
                <button
                    type="button"
                    className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex items-center"
                    onClick={() => {
                        addQueue(video)
                    }}
                >
                    <PlusSmIcon className='h-5 w-5'></PlusSmIcon> Añadir a la cola
                </button>
            </div>
        </div>*/