interface IPlaylist {
    _id?: string;
    name: string;
    songs: IPlaylistSong[];
}

export interface IPlaylistSong {
    _id?: string;
    name: string;
    video_id: string;
}

export default IPlaylist;