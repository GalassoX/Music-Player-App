import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';

import Home from './components/Home';
//import VideoSearch from './components/Search/VideoSearch';
import Sidebar from './components/Sidebar/Sidebar';
import SidebarMobile from './components/Sidebar/SidebarMobile';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import Auth from './components/Auth/Auth';
import Account from './components/User/Account';
import { IVideo } from './interfaces/Video';
import Playlists from './components/Playlists/Playlists';
import Config from './components/Configuration/Config';
import ChangePassword from './components/User/ChangePassword';
import Playlist from './components/Playlists/Playlist';

const RouterElements = () => {
    const [tracks, setTracks] = useState<IVideo[]>([]);
    const [autoplay, setAutoplay] = useState(false);

    const handlerStartSong = (video: IVideo) => {
        setTracks([video]);
        setAutoplay(true);
    }
    const handlerAddToQueue = (video: IVideo) => {
        setTracks([...tracks, video]);
        setAutoplay(false);
    }
    const playPlaylist = (videos: IVideo[]) => {
        setAutoplay(true);
        setTracks(videos);
    }

    return (
        <div>
            <div className="relative min-h-screen md:flex dark:bg-neutral-800">
                <SidebarMobile />
                <Sidebar />
                <div className="flex-1 p-10 container mx-auto">
                    <Routes>
                        <Route path="/" element={<Home startSong={handlerStartSong} addToQueue={handlerAddToQueue} />} />
                        <Route path="/playlists" element={<Playlists runPlaylist={playPlaylist} />} />
                        <Route path="/playlists/:id" element={<Playlist />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/account/settings" element={<Config />} />
                        <Route path="/account/change-password" element={<ChangePassword />} />
                    </Routes>
                </div>
            </div>
            <AudioPlayer tracks={tracks} autoplay={autoplay} />
        </div>
    )
}


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <RouterElements />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
