import React, { useState, useEffect, ChangeEvent } from 'react'
import { IVideo } from '../../interfaces/Video';
import { PlayIcon, PauseIcon, VolumeUpIcon, PlusSmIcon, MinusSmIcon } from '@heroicons/react/solid';
import { BsFillSkipBackwardFill, BsFillSkipForwardFill } from 'react-icons/bs';
import { getAudioURL } from '../../api/videos';
import AddToPlaylist from './AddToPlaylist';
import { setUserVolume } from '../../api/users';

interface Props {
    tracks: IVideo[];
    autoplay: boolean;
}

const AudioPlayer = ({ tracks, autoplay }: Props) => {
    const [trackIndex, setTrackIndex] = useState(0);
    const [audioHTML, setAudioHTML] = useState<HTMLAudioElement>()
    const [currentTrack, setCurrentTrack] = useState<IVideo>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [progressTrack, setProgressTrack] = useState(0);
    const [openATP, setOpenATP] = useState<boolean>(false);

    const getAudioLink = async (video_id: string): Promise<string> => {
        const { data } = await getAudioURL(video_id);
        return data.url;
    }

    const stopSong = () => {
        if (audioHTML !== undefined) {
            audioHTML.pause();
        }
        setIsPlaying(false);
    }

    const nextSong = (stopLastSong: boolean) => {
        if (tracks === undefined) return;
        setIsPlaying(false);
        if (trackIndex + 1 === tracks.length) {
            setTrackIndex(0);
            if (!stopLastSong) return;
        } else {
            setTrackIndex(trackIndex + 1);
        }
        playSong(trackIndex);
    }

    const prevSong = () => {
        if (tracks === undefined) return;
        if (audioHTML !== undefined) {
            audioHTML.pause();
        }
        setIsPlaying(false);
        if (trackIndex - 1 === -1) {
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
        playSong(trackIndex);
    }

    const playSong = async (index: number) => {
        if (audioHTML !== undefined) {
            audioHTML.pause();
        }
        let url: string;
        url = await getAudioLink(tracks[index].id);
        const audio = new Audio(url);
        setAudioHTML(audio);
        audio.play();
        audio.volume = volume;
        setCurrentTrack(tracks[index]);
        setIsPlaying(true);

        audio.addEventListener('timeupdate', (ev: Event) => {
            const progress = parseInt(audio.currentTime.toFixed(0));
            console.log(progress);
            setProgressTrack(progress);
            (document.getElementById('songTime') as HTMLInputElement).value = progress.toString();
        });


        audio.addEventListener('ended', () => {
            stopSong();
            nextSong(false);
        });
    }

    useEffect(() => {
        if (autoplay) {
            setTrackIndex(0);
            playSong(trackIndex);
        }
    }, [tracks]);

    const playButtonClick = () => {
        if (audioHTML === undefined) return;
        isPlaying ? audioHTML.pause() : audioHTML.play();
        setIsPlaying(!isPlaying);
    }

    const onSongTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (audioHTML === undefined) return;
        const progress = e.target.value;
        console.log(progress);
        audioHTML.currentTime = parseInt(progress);
        setProgressTrack(parseInt(progress));
    }

    const onVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const volume = parseInt(e.target.value) / 100;
        setVolume(volume);
        setUserVolume(volume);
        if (audioHTML !== undefined) {
            audioHTML.volume = volume;
        }
    }

    const formatSeconds = (seconds: number | undefined) => {
        if (seconds === undefined) return;
        let mins = Math.floor(seconds / 60);
        let secs = seconds - (mins * 60);

        let mins_s = `${mins}`,
            secs_s = `${secs}`;
        if (mins < 10) { mins_s = `0${mins}` };
        if (secs < 10) {
            secs_s = `0${secs}`
        };
        return `${mins_s}:${secs_s}`;
    }

    const showModalATP = () => {
        setOpenATP(true);
    }

    return (
        <footer className='fixed inset-x-0 bottom-0 p-4 border-t bg-gray-200 border-gray-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-slate-200 text-gray-800'>
            <div className="flex flex-row justify-between items-center">
                <div className='w-1/3 justify-center flex gap-2'>
                    <div>
                        <p className='font-light'>{currentTrack?.title}</p>
                        <p className='font-light text-xs'>{currentTrack?.author}</p>
                    </div>
                    {
                        currentTrack !== undefined ? (
                            <div>
                                <button
                                    className='bg-gray-300 dark:bg-neutral-800'
                                    onClick={showModalATP}
                                >
                                    <PlusSmIcon className='w-5 h-5' />
                                </button>
                            </div>) :
                            (<></>)
                    }
                </div>
                <div className='w-1/3'>
                    <div className='flex items-center gap-2 justify-center'>
                        <button>
                            <BsFillSkipBackwardFill
                                className='h-5 w-5'
                                onClick={() => prevSong()}
                            />
                        </button>
                        <button onClick={playButtonClick}>
                            {
                                isPlaying ?
                                    <PauseIcon className='h-10 w-10' />
                                    :
                                    <PlayIcon className='h-10 w-10' />
                            }
                        </button>
                        <button>
                            <BsFillSkipForwardFill
                                className='h-5 w-5'
                                onClick={() => nextSong(true)}
                            />
                        </button>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <p className='font-light text-sm'>{formatSeconds(progressTrack) || "00:00"}</p>
                        <input
                            type="range"
                            id="songTime"
                            className="appearance-none w-2/4 rounded h-1 p-0 bg-red-500 outline-none slider-thumb"
                            min='0'
                            max={currentTrack?.metadata.duration.seconds}
                            onChange={onSongTimeChange}
                            value={progressTrack}
                        />
                        <p className='font-light text-sm'>{formatSeconds(currentTrack?.metadata.duration.seconds) || "00:00"}</p>
                    </div>
                </div>
                <div className='items-center w-1/3 justify-center'>
                    <button className='flex justify-between items-center'>
                        <label htmlFor="volumeRange" className='flex justify-center items-center gap-3'>
                            <VolumeUpIcon className='h-5 w-5' /><p className='font-light'>Volumen</p>
                        </label>
                    </button>
                    <div className='flex items-center gap-2'>
                        <MinusSmIcon className='h-5 w-5' />
                        <input
                            type="range"
                            id="volumeRange"
                            className="appearance-none w-2/4 rounded h-1 p-0 bg-red-500 outline-none slider-thumb"
                            min='0'
                            max='100'
                            onChange={onVolumeChange}
                        />
                        <PlusSmIcon className='h-5 w-5 dark:text-white' />
                    </div>
                </div>
            </div>
            <AddToPlaylist open={openATP} song={currentTrack} setOpen={setOpenATP} />
        </footer >
    )
}

export default AudioPlayer;
