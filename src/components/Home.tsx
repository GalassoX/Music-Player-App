import React from 'react'
import { IVideo } from '../interfaces/Video';
import VideoSearch from './Search/VideoSearch';

interface Props {
    //onVideosChange: IVideo;
    startSong: (video: IVideo) => void;
    addToQueue: (video: IVideo) => void;
}

const Home = ({ startSong, addToQueue }: Props) => {
    return (
        <div>
            <VideoSearch startSong={startSong} addToQueue={addToQueue} />
        </div>
    )
}

export default Home;